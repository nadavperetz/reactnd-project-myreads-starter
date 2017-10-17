import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './API/BooksAPI'

import PropTypes from 'prop-types'
import {DebounceInput} from 'react-debounce-input';
import sortBy from 'sort-by'

import BookShelf from './BookShelf'

class SearchBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelfBooks: props.shelfBooks,
      asyncRunning: false,
    };
  }

  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
  };

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
        filteredBooks.push(shelfBooks[idx]);
      else
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
          this.setState({
            books: this.mergeBooksWithShelfBooks(data),
            asyncRunning: false
          })
        }
      })
    }
  };

  updateBooks = (books) => {
    this.setState(
        {books: books}
    )

  };

  isAnyBookSelected = (status) => {
    this.setState(
        {anyBookSelected: status}
    )
  };

  render() {
    const {books, asyncRunning} = this.state;
    const showingBooks = books.sort(sortBy('name'));
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
                         books={showingBooks}
                         isSearch={true}
                         updateBooks={this.updateBooks}
                         isAnyBookSelected={this.isAnyBookSelected}/>
          }
        </div>
    )
  }
}


export default SearchBooks

