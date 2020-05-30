import React from "react";

function BookShelfChanger(props) {
  const { handlebookmove, id, bookShelf } = props;
  const options = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read",
    none: "None",
  };
  return (
    <div className="book-shelf-changer">
      <select
        onChange={(event) => {
          handlebookmove(event, id);
        }}
        value={bookShelf}
      >
        <option value="move" disabled>
          Move to...
        </option>
        {/* Disable shelf move option for those books which are already in that particular shelf */}
        {Object.entries(options).map((opt, i) => {
          return (
            <option
              key={i}
              value={opt[0]}
              disabled={bookShelf.localeCompare(opt[0]) === 0}
            >
              {opt[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default BookShelfChanger;
