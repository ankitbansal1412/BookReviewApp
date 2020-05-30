import React from "react";
import Book from "./Book";

function SearchResultSpace(props) {
  const { books } = props;
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} handlebookmove={props.handlebookmove} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SearchResultSpace;
