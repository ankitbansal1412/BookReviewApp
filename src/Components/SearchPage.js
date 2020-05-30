import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SearchResultSpace from "./SearchResultSpace";
import * as BooksAPI from "../BooksAPI";
import _ from "lodash";

let bookArr = [];
class SearchPage extends Component {
  state = {
    books: [],
  };


  compareAndUpdateState(array) {
    array.forEach(arrayElement => {
      this.props.shelf.read.forEach(readElement => {
        if (arrayElement.id === readElement.id) {
          arrayElement.shelf = 'read'
        }
      })

      this.props.shelf.currentlyReading.forEach(readElement => {
        if (arrayElement.id === readElement.id) {
          arrayElement.shelf = 'currentlyReading'
        }
      })

      this.props.shelf.wantToRead.forEach(readElement => {
        if (arrayElement.id === readElement.id) {
          arrayElement.shelf = 'wantToRead'
        }
      })

      if (!arrayElement.shelf) {
        arrayElement.shelf = 'none'
      }

    });
    this.setState({
      books:array
    })
  }

  handleSearch = (event) => {
    /* signal to React not to nullify the event object */
    event.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        this.fetchSearchData(searchString);
      }, 200);
    }
    this.debouncedFn();
  };

  fetchSearchData = (query) => {
    BooksAPI.search(query)
      .then((data) => {
        if (data instanceof Array) {
          bookArr = data;
          this.compareAndUpdateState(bookArr)
        } else {
          this.setState({
            books: [],
          });
        }
      })
      .then((data) => {})
      .catch((err) => {});
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar handleSearch={this.handleSearch} />
        <SearchResultSpace
          books={this.state.books}
          handlebookmove={this.props.handlebookmove}
        />
      </div>
    );
  }
}

export default SearchPage;
