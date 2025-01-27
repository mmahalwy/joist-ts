import { Entity } from "EntityDbMetadata";
import { promises as fs } from "fs";
import prettier, { resolveConfig } from "prettier";
import { fail, sortKeys, trueIfResolved } from "./utils";

export interface FieldConfig {
  derived?: "sync" | "async";
  protected?: boolean;
  ignore?: true;
  superstruct?: string;
}

export interface RelationConfig {
  name?: string;
  polymorphic?: "notNull" | true;
  large?: true;
}

export interface EntityConfig {
  tag: string;
  tableName?: string;
  fields?: Record<string, FieldConfig>;
  relations?: Record<string, RelationConfig>;
}

export interface TimestampConfig {
  /** The names to check for this timestamp, i.e. `created_at` `created`, etc. */
  names: string[];
  /** Whether this timestamp column is required to consider a table an entity, defaults to `false`. */
  optional?: boolean;
}

export interface Config {
  contextType?: string;
  /**
   * Allows the user to specify the `updated_at` / `created_at` column names to look up, and if they're optional.
   *
   * We default to looking for `updated_at`, `updatedAt`, `created_at`, `createdAt`, and optional to true,
   * e.g. tables are not required to have both timestamp columns to be considered entities.
   *
   * These defaults are the most lenient, to facilitate running Joist against an existing schema and
   * seeing all of your entities, regardless of your previous conventions.
   */
  timestampColumns?: {
    createdAt?: TimestampConfig;
    updatedAt?: TimestampConfig;
  };
  /**
   * By default, we create a `flush_database` function for super fast testing.
   *
   * However, if you don't want to use this, or you have your own bespoke function like we do
   * that is more application-aware, then you can disable Joist's out-of-the-box one.
   */
  createFlushFunction?: boolean;
  entitiesDirectory: string;
  codegenPlugins: string[];
  entities: Record<string, EntityConfig>;
  ignoredTables?: string[];
  idType?: "untagged-string";
  // We don't persist this, and instead just use it as a cache
  __tableToEntityName?: Record<string, string>;
}

export const defaultConfig: Config = {
  entitiesDirectory: "./src/entities",
  codegenPlugins: [],
  entities: {},
  __tableToEntityName: {},
};

export const ormMaintainedFields = ["createdAt", "updatedAt"];

export function isDerived(config: Config, entity: Entity, fieldName: string): boolean {
  return config.entities[entity.name]?.fields?.[fieldName]?.derived === "sync";
}

export function isAsyncDerived(config: Config, entity: Entity, fieldName: string): boolean {
  return config.entities[entity.name]?.fields?.[fieldName]?.derived === "async";
}

export function isProtected(config: Config, entity: Entity, fieldName: string): boolean {
  return config.entities[entity.name]?.fields?.[fieldName]?.protected === true;
}

export function superstructConfig(config: Config, entity: Entity, fieldName: string): string | undefined {
  return config.entities[entity.name]?.fields?.[fieldName]?.superstruct;
}

export function isLargeCollection(config: Config, entity: Entity, fieldName: string): boolean {
  return config.entities[entity.name]?.relations?.[fieldName]?.large === true;
}

export function isFieldIgnored(
  config: Config,
  entity: Entity,
  fieldName: string,
  notNull: boolean = false,
  hasDefault: boolean = false,
): boolean {
  const ignore = config.entities[entity.name]?.fields?.[fieldName]?.ignore === true;
  if (ignore && notNull && !hasDefault) {
    fail(
      `notNull field ${entity.name}.${fieldName} cannot be ignored. Alter the column to be optional or have a default value prior to ignoring it.`,
    );
  }
  return ignore;
}

export function relationName(config: Config, entity: Entity, relationName: string): string {
  return config.entities?.[entity.name]?.relations?.[relationName]?.name ?? relationName;
}

const configPath = "./joist-codegen.json";
export async function loadConfig(): Promise<Config> {
  const exists = await trueIfResolved(fs.access(configPath));
  if (exists) {
    const content = await fs.readFile(configPath);
    return {
      ...defaultConfig,
      ...(JSON.parse(content.toString()) as Config),
    };
  }
  return defaultConfig;
}

/**
 * Writes the potentially-updated config entry back to `joist-codegen.json`.
 *
 * We format the output with prettier so it should both a) look nice and b) be deterministic,
 * such that no changes to the config show up as noops to the scm.
 */
export async function writeConfig(config: Config): Promise<void> {
  const prettierConfig = await resolveConfig("./");
  const sorted = sortKeys(config);
  delete sorted.__tableToEntityName;
  const input = JSON.stringify(sorted);
  const content = prettier.format(input.trim(), { parser: "json", ...prettierConfig });
  await fs.writeFile(configPath, content);
}

/** Applies defaults to the timestamp config. */
export function getTimestampConfig(config: Config): {
  updatedAtConf: Required<TimestampConfig>;
  createdAtConf: Required<TimestampConfig>;
} {
  return {
    createdAtConf: {
      names: ["created_at", "createdAt"],
      optional: true,
      ...config?.timestampColumns?.createdAt,
    },
    updatedAtConf: {
      names: ["updated_at", "updatedAt"],
      optional: true,
      ...config?.timestampColumns?.updatedAt,
    },
  };
}
