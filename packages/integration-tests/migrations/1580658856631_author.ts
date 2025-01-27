import {
  addColumns,
  createCreatedAtFunction,
  createEntityTable,
  createEnumTable,
  createManyToManyTable,
  createUpdatedAtFunction,
  enumArrayColumn,
  foreignKey,
} from "joist-migration-utils";
import { MigrationBuilder } from "node-pg-migrate";

export function up(b: MigrationBuilder): void {
  createUpdatedAtFunction(b);
  createCreatedAtFunction(b);

  createEnumTable(b, "publisher_size", [
    ["SMALL", "Small"],
    ["LARGE", "Large"],
  ]);

  // tests enum accessor codegen name collision
  createEnumTable(b, "publisher_type", [
    ["SMALL", "Small"],
    ["BIG", "Big"],
  ]);

  createEntityTable(b, "tags", {
    name: { type: "varchar(255)", notNull: true },
  });

  createEntityTable(b, "publishers", {
    name: { type: "varchar(255)", notNull: true },
    size_id: { type: "integer", references: "publisher_size", notNull: false },
    type_id: { type: "integer", references: "publisher_type", notNull: true, default: 2 },
    latitude: { type: "numeric(9, 6)", notNull: false },
    longitude: { type: "numeric(9, 6)", notNull: false },
    huge_number: { type: "numeric(17, 0)", notNull: false },
    // for testing large collections
    tag_id: foreignKey("tags", { notNull: false }),
  });

  createEnumTable(b, "color", [
    ["RED", "Red"],
    ["GREEN", "Green"],
    ["BLUE", "Blue"],
  ]);

  // Testing native pg enums
  b.createType("favorite_shape", ["circle", "square", "triangle"]);

  createEntityTable(b, "authors", {
    first_name: { type: "varchar(255)", notNull: true },
    last_name: { type: "varchar(255)", notNull: false },
    // for testing sync derived values
    initials: { type: "varchar(255)", notNull: true },
    // for testing async derived values
    number_of_books: { type: "integer", notNull: true },
    // for testing nullable booleans
    is_popular: { type: "boolean", notNull: false },
    // for testing integers
    age: { type: "integer", notNull: false },
    // for testing dates
    graduated: { type: "date", notNull: false },
    // for testing enum[] fields
    favorite_colors: enumArrayColumn("color"),
    // for testing native enum fields
    favorite_shape: { type: "favorite_shape", notNull: false },
    // for testing protected fields
    was_ever_popular: { type: "boolean", notNull: false },
    // for testing FieldConfig.ignore
    ignore_used_to_be_useful: { type: "boolean", notNull: false, default: true },
    ignore_used_to_be_useful_required_with_default: { type: "boolean", notNull: true, default: true },
    ignore_enum_fk_id: foreignKey("publisher_size", { notNull: false }),
    ignore_enum_fk_id_required_with_default: foreignKey("publisher_size", { notNull: true, default: 1 }),
    // for foreign key tests
    publisher_id: foreignKey("publishers", { notNull: false }),
    mentor_id: foreignKey("authors", { notNull: false }),
    // for testing jsbon columns
    address: { type: "jsonb", notNull: false },
  });

  // for testing required enums
  createEnumTable(b, "advance_status", [
    ["PENDING", "Pending"],
    ["SIGNED", "Signed"],
    ["PAID", "Paid"],
  ]);

  createEntityTable(b, "books", {
    title: { type: "varchar(255)", notNull: true },
    author_id: foreignKey("authors", { notNull: true }),
    // for testing columns that are keywords (and testing default values)
    order: { type: "integer", notNull: true, default: 1 },
  });

  // For testing o2o and m2o w/overlapping names in Book.author
  addColumns(b, "authors", {
    current_draft_book_id: foreignKey("books", { notNull: false, unique: true }),
  });

  createEntityTable(b, "book_advances", {
    // for testing required enums
    status_id: foreignKey("advance_status", { notNull: true }),
    publisher_id: foreignKey("publishers", { notNull: true }),
    book_id: foreignKey("books", { notNull: true }),
  });

  // for testing m2m w/tags (iirc)
  createEntityTable(b, "critics", {
    name: { type: "varchar(255)", notNull: true },
    // ignore test
    ignore_favourite_book_id: foreignKey("books", { notNull: false }),
    ignore_worst_book_id: foreignKey("books", { notNull: false, unique: true }),
  });

  // for testing a required m2o -> o2o
  createEntityTable(b, "critic_columns", {
    name: { type: "varchar(255)", notNull: true },
    critic_id: foreignKey("critics", { notNull: true, unique: true }),
  });

  // for testing children that are named a prefix of their parent
  createEntityTable(b, "book_reviews", {
    rating: { type: "integer", notNull: true },
    book_id: foreignKey("books", { notNull: true }),
    is_public: { type: "boolean", notNull: true },
  });

  // for testing ignore of many to many
  createManyToManyTable(b, "critics_to_tags", "critics", "tags");

  // for testing large many to many
  createManyToManyTable(b, "authors_to_tags", "authors", "tags");

  createManyToManyTable(b, "books_to_tags", "books", "tags");

  createEnumTable(b, "image_type", [
    ["BOOK_IMAGE", "Book Image"],
    ["AUTHOR_IMAGE", "Author Image"],
    ["PUBLISHER_IMAGE", "Publisher Image"],
  ]);

  b.addColumn("image_type", { sort_order: { type: "integer", notNull: true, default: 1_000_000 } });
  b.addColumn("image_type", { visible: { type: "boolean", notNull: true, default: true } });
  b.addColumn("image_type", { nickname: { type: "string", notNull: true, default: "" } });
  Object.entries({ BOOK_IMAGE: 100, AUTHOR_IMAGE: 200, PUBLISHER_IMAGE: 300 }).forEach(([code, sortOrder]) =>
    b.sql(`UPDATE image_type SET sort_order=${sortOrder}, nickname='${code.toLowerCase()}' WHERE code='${code}'`),
  );

  createEntityTable(b, "images", {
    type_id: foreignKey("image_type", { notNull: true }),
    file_name: { type: "varchar(255)", notNull: true },
    book_id: foreignKey("books", { notNull: false, unique: true }),
    author_id: foreignKey("authors", { notNull: false, unique: true }),
    publisher_id: foreignKey("publishers", { notNull: false }),
  });

  // for testing polymorphic references
  createEntityTable(b, "comments", {
    // inverse is o2m
    parent_book_id: foreignKey("books", { notNull: false }),
    // inverse is o2o
    parent_book_review_id: foreignKey("book_reviews", { notNull: false, unique: true }),
    parent_publisher_id: foreignKey("publishers", { notNull: false }),
    parent_author_id: foreignKey("authors", { notNull: false }),
    text: "text",
  });

  createEntityTable(b, "author_stats", {
    smallint: { type: "smallint", notNull: true },
    integer: { type: "integer", notNull: true },
    bigint: { type: "bigint", notNull: true },
    decimal: { type: "decimal", notNull: true },
    real: { type: "real", notNull: true },
    smallserial: { type: "smallserial", notNull: true },
    serial: { type: "serial", notNull: true },
    bigserial: { type: "bigserial", notNull: true },
    doublePrecision: { type: "double precision", notNull: true },
  });
}
