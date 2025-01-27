import { testDriver } from "../setupDbTests";

// Note this test infrastructure exist solely to test Joist itself, i.e. to use
// the low-level driver infra to setup/assert against data. Downstream applications
// should not copy this approach, and instead just use the factories and entities to
// setup and assert against test data.

export function select(tableName: string): Promise<readonly any[]> {
  return testDriver.select(tableName);
}

export function update(tableName: string, row: Record<string, any>): Promise<void> {
  return testDriver.update(tableName, row);
}

// turns out delete as a function is not allowed, but it is as a method
export function del(tableName: string, id: number): Promise<void> {
  return testDriver.delete(tableName, id);
}

export function insertAuthor(row: {
  id?: number;
  first_name: string;
  last_name?: string | null;
  age?: number | null;
  is_popular?: boolean | null;
  publisher_id?: number | null;
  mentor_id?: number | null;
  initials?: string;
  number_of_books?: number;
  favorite_colors?: number[];
  favorite_shape?: string;
  address?: object;
  graduated?: any;
  updated_at?: any;
}) {
  return testDriver.insert("authors", { initials: row.first_name[0], number_of_books: 0, ...row });
}

export function insertBook(row: { id?: number; title: string; author_id: number | null }) {
  return testDriver.insert("books", row);
}

export function insertComment(row: {
  id?: number;
  text: string;
  parent_book_id?: number;
  parent_book_review_id?: number;
}) {
  return testDriver.insert("comments", row);
}

export function insertPublisher(row: {
  id?: number;
  name: string;
  longitude?: string | number;
  latitude?: string | number;
  huge_number?: string | number;
  size_id?: number;
  tag_id?: number;
}) {
  return testDriver.insert("publishers", row);
}

export function insertTag(row: { id?: number; name: string }) {
  return testDriver.insert("tags", row);
}

export function insertBookToTag(row: { id?: number; book_id: number; tag_id: number }) {
  return testDriver.insert("books_to_tags", row);
}

export function insertAuthorToTag(row: { id?: number; author_id: number; tag_id: number }) {
  return testDriver.insert("authors_to_tags", row);
}

export function insertBookReview(row: { id?: number; book_id: number; rating: number; is_public?: boolean }) {
  return testDriver.insert("book_reviews", { is_public: true, ...row });
}

export function insertImage(row: {
  id?: number;
  type_id: number;
  book_id?: number | null;
  author_id?: number | null;
  publisher_id?: number | null;
  file_name: string;
}) {
  return testDriver.insert("images", row);
}

export function countOfBooks() {
  return testDriver.count("books");
}

export function countOfTags() {
  return testDriver.count("tags");
}

export function countOfBookToTags() {
  return testDriver.count("books_to_tags");
}

export function countOfAuthors() {
  return testDriver.count("authors");
}
