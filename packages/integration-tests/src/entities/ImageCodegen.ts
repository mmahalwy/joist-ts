import {
  BaseEntity,
  Changes,
  ConfigApi,
  EntityFilter,
  EntityGraphQLFilter,
  EntityOrmField,
  EnumGraphQLFilter,
  fail,
  FilterOf,
  Flavor,
  GraphQLFilterOf,
  hasOne,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  ManyToOneReference,
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
import {
  Author,
  AuthorId,
  authorMeta,
  AuthorOrder,
  Book,
  BookId,
  bookMeta,
  BookOrder,
  Image,
  imageMeta,
  ImageType,
  ImageTypeDetails,
  ImageTypes,
  newImage,
  Publisher,
  PublisherId,
  publisherMeta,
  PublisherOrder,
} from "./entities";

export type ImageId = Flavor<string, "Image">;

export interface ImageOpts {
  fileName: string;
  type: ImageType;
  author?: Author | null;
  book?: Book | null;
  publisher?: Publisher | null;
}

export interface ImageIdsOpts {
  authorId?: AuthorId | null;
  bookId?: BookId | null;
  publisherId?: PublisherId | null;
}

export interface ImageFilter {
  id?: ValueFilter<ImageId, never>;
  fileName?: ValueFilter<string, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  type?: ValueFilter<ImageType, never>;
  author?: EntityFilter<Author, AuthorId, FilterOf<Author>, null | undefined>;
  book?: EntityFilter<Book, BookId, FilterOf<Book>, null | undefined>;
  publisher?: EntityFilter<Publisher, PublisherId, FilterOf<Publisher>, null | undefined>;
}

export interface ImageGraphQLFilter {
  id?: ValueGraphQLFilter<ImageId>;
  fileName?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  type?: EnumGraphQLFilter<ImageType>;
  author?: EntityGraphQLFilter<Author, AuthorId, GraphQLFilterOf<Author>>;
  book?: EntityGraphQLFilter<Book, BookId, GraphQLFilterOf<Book>>;
  publisher?: EntityGraphQLFilter<Publisher, PublisherId, GraphQLFilterOf<Publisher>>;
}

export interface ImageOrder {
  id?: OrderBy;
  fileName?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
  type?: OrderBy;
  author?: AuthorOrder;
  book?: BookOrder;
  publisher?: PublisherOrder;
}

export const imageConfig = new ConfigApi<Image, Context>();

imageConfig.addRule(newRequiredRule("fileName"));
imageConfig.addRule(newRequiredRule("createdAt"));
imageConfig.addRule(newRequiredRule("updatedAt"));
imageConfig.addRule(newRequiredRule("type"));

export abstract class ImageCodegen extends BaseEntity<EntityManager> {
  static defaultValues: object = {};

  readonly __orm!: EntityOrmField & {
    filterType: ImageFilter;
    gqlFilterType: ImageGraphQLFilter;
    orderType: ImageOrder;
    optsType: ImageOpts;
    optIdsType: ImageIdsOpts;
    factoryOptsType: Parameters<typeof newImage>[1];
  };

  readonly author: ManyToOneReference<Image, Author, undefined> = hasOne(authorMeta, "author", "image");

  readonly book: ManyToOneReference<Image, Book, undefined> = hasOne(bookMeta, "book", "image");

  readonly publisher: ManyToOneReference<Image, Publisher, undefined> = hasOne(publisherMeta, "publisher", "images");

  constructor(em: EntityManager, opts: ImageOpts) {
    super(em, imageMeta, ImageCodegen.defaultValues, opts);
    setOpts(this as any as Image, opts, { calledFromConstructor: true });
  }

  get id(): ImageId | undefined {
    return this.idTagged;
  }

  get idOrFail(): ImageId {
    return this.id || fail("Image has no id yet");
  }

  get idTagged(): ImageId | undefined {
    return this.__orm.data["id"];
  }

  get idTaggedOrFail(): ImageId {
    return this.idTagged || fail("Image has no id tagged yet");
  }

  get fileName(): string {
    return this.__orm.data["fileName"];
  }

  set fileName(fileName: string) {
    setField(this, "fileName", fileName);
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  get type(): ImageType {
    return this.__orm.data["type"];
  }

  get typeDetails(): ImageTypeDetails {
    return ImageTypes.getByCode(this.type);
  }

  set type(type: ImageType) {
    setField(this, "type", type);
  }

  get isBookImage(): boolean {
    return this.__orm.data["type"] === ImageType.BookImage;
  }

  get isAuthorImage(): boolean {
    return this.__orm.data["type"] === ImageType.AuthorImage;
  }

  get isPublisherImage(): boolean {
    return this.__orm.data["type"] === ImageType.PublisherImage;
  }

  set(opts: Partial<ImageOpts>): void {
    setOpts(this as any as Image, opts);
  }

  setPartial(opts: PartialOrNull<ImageOpts>): void {
    setOpts(this as any as Image, opts as OptsOf<Image>, { partial: true });
  }

  get changes(): Changes<Image> {
    return newChangesProxy(this as any as Image);
  }

  load<U, V>(fn: (lens: Lens<Image>) => Lens<U, V>): Promise<V> {
    return loadLens(this as any as Image, fn);
  }

  populate<H extends LoadHint<Image>>(hint: H): Promise<Loaded<Image, H>>;
  populate<H extends LoadHint<Image>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<Image, H>>;
  populate<H extends LoadHint<Image>, V>(hint: H, fn: (i: Loaded<Image, H>) => V): Promise<V>;
  populate<H extends LoadHint<Image>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (i: Loaded<Image, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<Image>, V>(
    hintOrOpts: any,
    fn?: (i: Loaded<Image, H>) => V,
  ): Promise<Loaded<Image, H> | V> {
    return this.em.populate(this as any as Image, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<Image>>(hint: H): this is Loaded<Image, H> {
    return isLoaded(this as any as Image, hint);
  }
}
