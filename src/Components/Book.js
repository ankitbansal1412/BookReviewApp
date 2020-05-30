import React from "react";
import BookShelfChanger from "./BookShelfChanger";

function Book(props) {
  const { imageLinks, title, authors, id , shelf} = props.book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={
            imageLinks
              ? {
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${imageLinks.thumbnail})`,
                }
              : { width: 128, height: 193 }
          }
        />
        <BookShelfChanger id={id} handlebookmove={props.handlebookmove} bookShelf={shelf} />
      </div>
      <div className="book-title">{title}</div>
      {authors
        ? authors.map((author) => (
            <div key={authors.indexOf(author)} className="book-authors">
              {author}
            </div>
          ))
        : ""}
    </div>
  );
}

export default Book;
