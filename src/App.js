import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link, Route , Switch} from "react-router-dom";
import PropTypes from "prop-types";

import Shelf from "./Components/Shelf";
import SearchPage from "./Components/SearchPage";
import NoMatch from "./Components/NotFoundPage";

class BooksApp extends React.Component {
  state = {
    shelf: {
      currentlyReading: [],
      read: [],
      wantToRead: [],
      none:[]
    },
  };

  componentDidMount() {
    this.setView();
  }

  setView() {
    BooksAPI.getAll().then((books) => {
      const shelf = {
        read: [],
        currentlyReading: [],
        wantToRead: [],
      };

      books.map((book) => {
        let thisShelf = book.shelf;
        let currentBook = {};

        currentBook.id = book.id;
        currentBook.title = book.title;
        currentBook.authors = book.authors;
        currentBook.imageLinks = book.imageLinks;
        currentBook.shelf = book.shelf
        shelf[thisShelf].push(currentBook);

        this.updateState(shelf);

        return book;
      });
    });
  }

  updateState(shelf) {
    this.setState({
      shelf: shelf,
    });
  }

  handlebookmove = (event, id) => {
    let { value } = event.target;
    BooksAPI.update({ id }, value)
      .then((book) => {
        this.setView();
      })
      .catch((err) => {});
  };




  render() {
    return (
      <div className="app">
        <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <Shelf
                bookShelfTitle={`Currently Reading`}
                books={this.state.shelf.currentlyReading}
                handlebookmove={this.handlebookmove}
              />
              <Shelf
                bookShelfTitle={`Want To Read`}
                books={this.state.shelf.wantToRead}
                handlebookmove={this.handlebookmove}
              />
              <Shelf
                bookShelfTitle={`Read`}
                books={this.state.shelf.read}
                handlebookmove={this.handlebookmove}
              />
              <div className="open-search">
                <Link to="/search">
                  <button>Search</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <SearchPage handlebookmove={this.handlebookmove} shelf={this.state.shelf} />
            </div>
          )}
          />
          <Route component={NoMatch}/>
          </Switch>
      </div>
    );
  }
}

Shelf.propTypes = {
  bookShelfTitle: PropTypes.string,
  books: PropTypes.array.isRequired,
  handlebookmove: PropTypes.func.isRequired,
};

SearchPage.protoType = {
  handlebookmove: PropTypes.func.isRequired,
};

export default BooksApp;
