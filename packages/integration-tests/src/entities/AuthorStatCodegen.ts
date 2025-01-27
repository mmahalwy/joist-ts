import {
  BaseEntity,
  Changes,
  ConfigApi,
  EntityOrmField,
  fail,
  Flavor,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  newChangesProxy,
  newRequiredRule,
  OptsOf,
  OrderBy,
  PartialOrNull,
  setField,
  setOpts,
  ValueFilter,
  ValueGraphQLFilter,
} from "joist-orm";
import { Context } from "src/context";
import type { EntityManager } from "./entities";
import { AuthorStat, authorStatMeta, newAuthorStat } from "./entities";

export type AuthorStatId = Flavor<string, "AuthorStat">;

export interface AuthorStatOpts {
  smallint: number;
  integer: number;
  bigint: number;
  decimal: number;
  real: number;
  smallserial: number;
  serial: number;
  bigserial: number;
  doublePrecision: number;
}

export interface AuthorStatIdsOpts {}

export interface AuthorStatFilter {
  id?: ValueFilter<AuthorStatId, never>;
  smallint?: ValueFilter<number, never>;
  integer?: ValueFilter<number, never>;
  bigint?: ValueFilter<number, never>;
  decimal?: ValueFilter<number, never>;
  real?: ValueFilter<number, never>;
  smallserial?: ValueFilter<number, never>;
  serial?: ValueFilter<number, never>;
  bigserial?: ValueFilter<number, never>;
  doublePrecision?: ValueFilter<number, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
}

export interface AuthorStatGraphQLFilter {
  id?: ValueGraphQLFilter<AuthorStatId>;
  smallint?: ValueGraphQLFilter<number>;
  integer?: ValueGraphQLFilter<number>;
  bigint?: ValueGraphQLFilter<number>;
  decimal?: ValueGraphQLFilter<number>;
  real?: ValueGraphQLFilter<number>;
  smallserial?: ValueGraphQLFilter<number>;
  serial?: ValueGraphQLFilter<number>;
  bigserial?: ValueGraphQLFilter<number>;
  doublePrecision?: ValueGraphQLFilter<number>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
}

export interface AuthorStatOrder {
  id?: OrderBy;
  smallint?: OrderBy;
  integer?: OrderBy;
  bigint?: OrderBy;
  decimal?: OrderBy;
  real?: OrderBy;
  smallserial?: OrderBy;
  serial?: OrderBy;
  bigserial?: OrderBy;
  doublePrecision?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
}

export const authorStatConfig = new ConfigApi<AuthorStat, Context>();

authorStatConfig.addRule(newRequiredRule("smallint"));
authorStatConfig.addRule(newRequiredRule("integer"));
authorStatConfig.addRule(newRequiredRule("bigint"));
authorStatConfig.addRule(newRequiredRule("decimal"));
authorStatConfig.addRule(newRequiredRule("real"));
authorStatConfig.addRule(newRequiredRule("smallserial"));
authorStatConfig.addRule(newRequiredRule("serial"));
authorStatConfig.addRule(newRequiredRule("bigserial"));
authorStatConfig.addRule(newRequiredRule("doublePrecision"));
authorStatConfig.addRule(newRequiredRule("createdAt"));
authorStatConfig.addRule(newRequiredRule("updatedAt"));

export abstract class AuthorStatCodegen extends BaseEntity<EntityManager> {
  static defaultValues: object = {};

  readonly __orm!: EntityOrmField & {
    filterType: AuthorStatFilter;
    gqlFilterType: AuthorStatGraphQLFilter;
    orderType: AuthorStatOrder;
    optsType: AuthorStatOpts;
    optIdsType: AuthorStatIdsOpts;
    factoryOptsType: Parameters<typeof newAuthorStat>[1];
  };

  constructor(em: EntityManager, opts: AuthorStatOpts) {
    super(em, authorStatMeta, AuthorStatCodegen.defaultValues, opts);
    setOpts(this as any as AuthorStat, opts, { calledFromConstructor: true });
  }

  get id(): AuthorStatId | undefined {
    return this.idTagged;
  }

  get idOrFail(): AuthorStatId {
    return this.id || fail("AuthorStat has no id yet");
  }

  get idTagged(): AuthorStatId | undefined {
    return this.__orm.data["id"];
  }

  get idTaggedOrFail(): AuthorStatId {
    return this.idTagged || fail("AuthorStat has no id tagged yet");
  }

  get smallint(): number {
    return this.__orm.data["smallint"];
  }

  set smallint(smallint: number) {
    setField(this, "smallint", smallint);
  }

  get integer(): number {
    return this.__orm.data["integer"];
  }

  set integer(integer: number) {
    setField(this, "integer", integer);
  }

  get bigint(): number {
    return this.__orm.data["bigint"];
  }

  set bigint(bigint: number) {
    setField(this, "bigint", bigint);
  }

  get decimal(): number {
    return this.__orm.data["decimal"];
  }

  set decimal(decimal: number) {
    setField(this, "decimal", decimal);
  }

  get real(): number {
    return this.__orm.data["real"];
  }

  set real(real: number) {
    setField(this, "real", real);
  }

  get smallserial(): number {
    return this.__orm.data["smallserial"];
  }

  set smallserial(smallserial: number) {
    setField(this, "smallserial", smallserial);
  }

  get serial(): number {
    return this.__orm.data["serial"];
  }

  set serial(serial: number) {
    setField(this, "serial", serial);
  }

  get bigserial(): number {
    return this.__orm.data["bigserial"];
  }

  set bigserial(bigserial: number) {
    setField(this, "bigserial", bigserial);
  }

  get doublePrecision(): number {
    return this.__orm.data["doublePrecision"];
  }

  set doublePrecision(doublePrecision: number) {
    setField(this, "doublePrecision", doublePrecision);
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  set(opts: Partial<AuthorStatOpts>): void {
    setOpts(this as any as AuthorStat, opts);
  }

  setPartial(opts: PartialOrNull<AuthorStatOpts>): void {
    setOpts(this as any as AuthorStat, opts as OptsOf<AuthorStat>, { partial: true });
  }

  get changes(): Changes<AuthorStat> {
    return newChangesProxy(this as any as AuthorStat);
  }

  load<U, V>(fn: (lens: Lens<AuthorStat>) => Lens<U, V>): Promise<V> {
    return loadLens(this as any as AuthorStat, fn);
  }

  populate<H extends LoadHint<AuthorStat>>(hint: H): Promise<Loaded<AuthorStat, H>>;
  populate<H extends LoadHint<AuthorStat>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<AuthorStat, H>>;
  populate<H extends LoadHint<AuthorStat>, V>(hint: H, fn: (as: Loaded<AuthorStat, H>) => V): Promise<V>;
  populate<H extends LoadHint<AuthorStat>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (as: Loaded<AuthorStat, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<AuthorStat>, V>(
    hintOrOpts: any,
    fn?: (as: Loaded<AuthorStat, H>) => V,
  ): Promise<Loaded<AuthorStat, H> | V> {
    return this.em.populate(this as any as AuthorStat, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<AuthorStat>>(hint: H): this is Loaded<AuthorStat, H> {
    return isLoaded(this as any as AuthorStat, hint);
  }
}
