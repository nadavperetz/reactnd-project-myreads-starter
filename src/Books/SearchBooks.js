import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './API/BooksAPI'

import {DebounceInput} from 'react-debounce-input';
import sortBy from 'sort-by'

import BookShelf from './BookShelf'

class SearchBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelfBooks: [],
      asyncRunning: false,
    };
  }

  componentDidMount() {
    if (this.state.shelfBooks.length === 0) {
      this.setState({asyncRunning: true});
      BooksAPI.getAll().then((shelfBooks) => {
        this.setState({
          shelfBooks: shelfBooks,
          asyncRunning: false
        })
      })
    }
  }

  mergeBooksWithShelfBooks = (data) => {
    let shelfBooks = this.state.shelfBooks;
    let filteredBooks = [];
    for (let book of data) {
      let idx = shelfBooks.findIndex(shelfBook => shelfBook.id === book.id);
      if (idx >= 0)
        book.shelf = shelfBooks[idx].shelf;
      if (book.shelf === undefined)
          book.shelf = 'none';
      filteredBooks.push(book);

    }
    return filteredBooks;
  };


  inputSearchEvent = (event) => {
    let query = event.target.value;
    if (query && !this.state.asyncRunning) {
      this.setState({asyncRunning: true});
      BooksAPI.search(query, 10).then((data) => {
        if (data.error === "empty query") {
          this.setState({asyncRunning: false, books: []})
        }
        else {
          const showingBooks = this.mergeBooksWithShelfBooks(data).sort(sortBy('name'));
          this.setState({
            books: showingBooks,
            asyncRunning: false
          })
        }
      })
    }
  };

  updateBook = (book) => {
    let shelfBooks = this.state.shelfBooks;
    let searchBooks = this.state.books;
    let idx = shelfBooks.findIndex(old_book => old_book.id === book.id);
    shelfBooks[idx] = book;
    idx = searchBooks.findIndex(old_book => old_book.id === book.id);
    searchBooks[idx] = book;
    this.setState(
        {books: searchBooks,
         shelfBooks: shelfBooks}
    )

  };

  isAnyBookSelected = (status) => {
    this.setState(
        {anyBookSelected: status}
    )
  };

  render() {
    const {books, asyncRunning} = this.state;
    return (
        <div className="search-books">
          <div className="search-books-bar">

            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  type="text"
                  placeholder="Type title or author"
                  onChange={(event) => this.inputSearchEvent(event)}
              />
            </div>
          </div>
          {asyncRunning ?
              <Spinner/>
              :
              <BookShelf shelf={'search'}
                         books={books}
                         isSearch={true}
                         updateBook={this.updateBook}
                         isAnyBookSelected={this.isAnyBookSelected}/>
          }
        </div>
    )
  }
}


export default SearchBooks

