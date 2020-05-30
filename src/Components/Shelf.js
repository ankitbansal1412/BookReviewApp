import React from "react";
import Book from "./Book";

function Shelf(props) {
  const { bookShelfTitle, books, handlebookmove } = props;
  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bookShelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => {
                return (
                  <li key={book.id}>
                    <Book book={book} handlebookmove={handlebookmove} />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shelf;
