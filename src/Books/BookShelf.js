import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './API/BooksAPI'
import Book from './Book'

import Spinner from '../Animation/Spinner'


class BookShelf extends Component {

  state = {
    selectedBooks: [],
  };

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    isAnyBookSelected: PropTypes.func.isRequired
  };


  changeShelf = (book, new_shelf) => {
    BooksAPI.update(book, new_shelf).then((_) => {
      book.shelf = new_shelf;
      this.props.updateBook(book);
    })
  };

  addSelectionToShelf = (e) => {
    const newShelf = e.target.value;
    for (let selectedBook of this.state.selectedBooks) {
      this.changeShelf(selectedBook, newShelf)
    }
    this.setState({selectedBooks: []});
    this.props.isAnyBookSelected(false);

  };

  bookSelected = (checked, book) => {
    let old_books = this.state.selectedBooks;
    const idx = old_books.findIndex(old_book => old_book.id === book.id);
    // Remove
    if (!checked && idx >= 0) {
      old_books.splice(idx, 1);
    }
    // Add
    else if (checked && idx < 0) {
      old_books.push(book);

    }
    this.setState({selectedBooks: old_books});
    if (this.state.selectedBooks.length > 0)
      this.props.isAnyBookSelected(true);
    else
      this.props.isAnyBookSelected(false);

  };

  render() {
    const {books, shelf} = this.props;
    const {selectedBooks} = this.state;
    let isSearch = false;
    let showingBooks = books;
    let anyBookSelected = selectedBooks.length > 0;
    if (this.props.shelf === 'search')
      isSearch = true;
    else
      showingBooks = books.filter((book) => book.shelf === shelf);
    const classNameMaster = isSearch ? 'search-books-results' : 'bookshelf';
    return (

        <div className={classNameMaster}>
          <div className="bookshelf-books">
            {(showingBooks.length > 0) ?
                <ol className="books-grid">
                  {showingBooks.map((book) =>
                      <Book key={book.id}
                            book={book}
                            changeShelf={this.changeShelf}
                            bookSelected={this.bookSelected}
                      />)}
                </ol>
                :
                !isSearch &&
                <Spinner/>

            }

          </div>
          {anyBookSelected &&
          <div className="move-on-batch">
            <select onChange={this.addSelectionToShelf} value='none'>
              <option value="none" disabled></option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
          }
        </div>


    )
  }
}

export default BookShelf