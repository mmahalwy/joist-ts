import {
  BaseEntity,
  BooleanFilter,
  BooleanGraphQLFilter,
  Changes,
  ConfigApi,
  EntityFilter,
  EntityGraphQLFilter,
  EntityOrmField,
  fail,
  FilterOf,
  Flavor,
  GraphQLFilterOf,
  hasOne,
  hasOneToOne,
  isLoaded,
  Lens,
  Loaded,
  LoadHint,
  loadLens,
  ManyToOneReference,
  newChangesProxy,
  newRequiredRule,
  OneToOneReference,
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
  Book,
  BookId,
  bookMeta,
  BookOrder,
  BookReview,
  bookReviewMeta,
  Comment,
  CommentId,
  commentMeta,
  newBookReview,
} from "./entities";

export type BookReviewId = Flavor<string, "BookReview">;

export interface BookReviewOpts {
  rating: number;
  book: Book;
  comment?: Comment | null;
}

export interface BookReviewIdsOpts {
  bookId?: BookId | null;
  commentId?: CommentId | null;
}

export interface BookReviewFilter {
  id?: ValueFilter<BookReviewId, never>;
  rating?: ValueFilter<number, never>;
  isPublic?: BooleanFilter<never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
  book?: EntityFilter<Book, BookId, FilterOf<Book>, never>;
  comment?: EntityFilter<Comment, CommentId, FilterOf<Comment>, null | undefined>;
}

export interface BookReviewGraphQLFilter {
  id?: ValueGraphQLFilter<BookReviewId>;
  rating?: ValueGraphQLFilter<number>;
  isPublic?: BooleanGraphQLFilter;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
  book?: EntityGraphQLFilter<Book, BookId, GraphQLFilterOf<Book>>;
  comment?: EntityGraphQLFilter<Comment, CommentId, GraphQLFilterOf<Comment>>;
}

export interface BookReviewOrder {
  id?: OrderBy;
  rating?: OrderBy;
  isPublic?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
  book?: BookOrder;
}

export const bookReviewConfig = new ConfigApi<BookReview, Context>();

bookReviewConfig.addRule(newRequiredRule("rating"));
bookReviewConfig.addRule(newRequiredRule("isPublic"));
bookReviewConfig.addRule(newRequiredRule("createdAt"));
bookReviewConfig.addRule(newRequiredRule("updatedAt"));
bookReviewConfig.addRule(newRequiredRule("book"));

export abstract class BookReviewCodegen extends BaseEntity<EntityManager> {
  static defaultValues: object = {};

  readonly __orm!: EntityOrmField & {
    filterType: BookReviewFilter;
    gqlFilterType: BookReviewGraphQLFilter;
    orderType: BookReviewOrder;
    optsType: BookReviewOpts;
    optIdsType: BookReviewIdsOpts;
    factoryOptsType: Parameters<typeof newBookReview>[1];
  };

  readonly book: ManyToOneReference<BookReview, Book, never> = hasOne(bookMeta, "book", "reviews");

  readonly comment: OneToOneReference<BookReview, Comment> = hasOneToOne(
    commentMeta,
    "comment",
    "parent",
    "parent_book_review_id",
  );

  constructor(em: EntityManager, opts: BookReviewOpts) {
    super(em, bookReviewMeta, BookReviewCodegen.defaultValues, opts);
    setOpts(this as any as BookReview, opts, { calledFromConstructor: true });
  }

  get id(): BookReviewId | undefined {
    return this.idTagged;
  }

  get idOrFail(): BookReviewId {
    return this.id || fail("BookReview has no id yet");
  }

  get idTagged(): BookReviewId | undefined {
    return this.__orm.data["id"];
  }

  get idTaggedOrFail(): BookReviewId {
    return this.idTagged || fail("BookReview has no id tagged yet");
  }

  get rating(): number {
    return this.__orm.data["rating"];
  }

  set rating(rating: number) {
    setField(this, "rating", rating);
  }

  get isPublic(): boolean {
    if (!("isPublic" in this.__orm.data)) {
      throw new Error("isPublic has not been derived yet");
    }
    return this.__orm.data["isPublic"];
  }

  get createdAt(): Date {
    return this.__orm.data["createdAt"];
  }

  get updatedAt(): Date {
    return this.__orm.data["updatedAt"];
  }

  set(opts: Partial<BookReviewOpts>): void {
    setOpts(this as any as BookReview, opts);
  }

  setPartial(opts: PartialOrNull<BookReviewOpts>): void {
    setOpts(this as any as BookReview, opts as OptsOf<BookReview>, { partial: true });
  }

  get changes(): Changes<BookReview> {
    return newChangesProxy(this as any as BookReview);
  }

  load<U, V>(fn: (lens: Lens<BookReview>) => Lens<U, V>): Promise<V> {
    return loadLens(this as any as BookReview, fn);
  }

  populate<H extends LoadHint<BookReview>>(hint: H): Promise<Loaded<BookReview, H>>;
  populate<H extends LoadHint<BookReview>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<BookReview, H>>;
  populate<H extends LoadHint<BookReview>, V>(hint: H, fn: (br: Loaded<BookReview, H>) => V): Promise<V>;
  populate<H extends LoadHint<BookReview>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (br: Loaded<BookReview, H>) => V,
  ): Promise<V>;
  populate<H extends LoadHint<BookReview>, V>(
    hintOrOpts: any,
    fn?: (br: Loaded<BookReview, H>) => V,
  ): Promise<Loaded<BookReview, H> | V> {
    return this.em.populate(this as any as BookReview, hintOrOpts, fn);
  }

  isLoaded<H extends LoadHint<BookReview>>(hint: H): this is Loaded<BookReview, H> {
    return isLoaded(this as any as BookReview, hint);
  }
}
