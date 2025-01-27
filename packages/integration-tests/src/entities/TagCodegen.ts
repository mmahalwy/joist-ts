import {
  BaseEntity,
  Changes,
  Collection,
  ConfigApi,
  EntityOrmField,
  fail,
  Flavor,
  hasLargeMany,
  hasLargeManyToMany,
  hasManyToMany,
  isLoaded,
  LargeCollection,
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
import { Author, authorMeta, Book, BookId, bookMeta, newTag, Publisher, publisherMeta, Tag, tagMeta } from "./entities";

export type TagId = Flavor<string, "Tag">;

export interface TagOpts {
  name: string;
  books?: Book[];
}

export interface TagIdsOpts {
  bookIds?: BookId[] | null;
}

export interface TagFilter {
  id?: ValueFilter<TagId, never>;
  name?: ValueFilter<string, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
}

export interface TagGraphQLFilter {
  id?: ValueGraphQLFilter<TagId>;
  name?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
}

export interface TagOrder {
  id?: OrderBy;
  name?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
}

export const tagConfig = new ConfigApi<Tag, Context>();

tagConfig.addRule(newRequiredRule("name"));
tagConfig.addRule(newRequiredRule("createdAt"));
tagConfig.addRule(newRequiredRule("updatedAt"));

export abstract class TagCodegen extends BaseEntity<EntityManager> {
  static defaultValues: object = {};

  readonly __orm!: EntityOrmField & {
    filterType: TagFilter;
    gqlFilterType: TagGraphQLFilter;
    orderType: TagOrder;
    optsType: TagOpts;
    optIdsType: TagIdsOpts;
    factoryOptsType: Parameters<typeof newTag>[1];
  };

  readonly publishers: LargeCollection<Tag, Publisher> = hasLargeMany(publisherMeta, "publishers", "tag", "tag_id");

  readonly books: Collection<Tag, Book> = hasManyToMany(
    "books_to_tags",
    "books",
    "tag_id",
    bookMeta,
    "tags",
    "book_id",
  );

  readonly authors: LargeCollection<Tag, Author> = hasLargeManyToMany(
    "authors_to_tags",
    "authors",
    "tag_id",
    authorMeta,
    "tags",
    "author_id",
  );

  constructor(em: EntityManager, opts: TagOpts) {
    super(em, tagMeta, TagCodegen.defaultValues, opts);
    setOpts(this as any as Tag, opts, { calledFromConstructor: true });
  }

  get id(): TagId | undefined {
    return this.idTagged;
  }

  get idOrFail(): TagId {
    return this.id || fail("Tag has no id yet");
  }

  get idTagged(): TagId | undefined {
    return this.__orm.data["id"];
  }

  get idTaggedOrFail(): TagId {
    return this.idTagged || fail("Tag has no id tagged yet");
  }

  get name(): string {
    return this.__orm.data["name"];
  }

  set name(name: string) {
    setField(this, "name", name);
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  set(opts: Partial<TagOpts>): void {
    setOpts(this as any as Tag, opts);
  }

  setPartial(opts: PartialOrNull<TagOpts>): void {
    setOpts(this as any as Tag, opts as OptsOf<Tag>, { partial: true });
  }

  get changes(): Changes<Tag> {
    return newChangesProxy(this as any as Tag);
  }

  load<U, V>(fn: (lens: Lens<Tag>) => Lens<U, V>): Promise<V> {
    return loadLens(this as any as Tag, fn);
  }

  populate<H extends LoadHint<Tag>>(hint: H): Promise<Loaded<Tag, H>>;
  populate<H extends LoadHint<Tag>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<Tag, H>>;
  populate<H extends LoadHint<Tag>, V>(hint: H, fn: (t: Loaded<Tag, H>) => V): Promise<V>;
  populate<H extends LoadHint<Tag>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (t: Loaded<Tag, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<Tag>, V>(hintOrOpts: any, fn?: (t: Loaded<Tag, H>) => V): Promise<Loaded<Tag, H> | V> {
    return this.em.populate(this as any as Tag, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<Tag>>(hint: H): this is Loaded<Tag, H> {
    return isLoaded(this as any as Tag, hint);
  }
}
