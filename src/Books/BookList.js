import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import * as BooksAPI from './API/BooksAPI'
import BookShelf from './BookShelf'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import sortBy from 'sort-by'

class BookList extends Component {

  state = {
    books: [],
    selectedBooks: [],
    anyBookSelected: false
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('name'));
      this.setState({books: books})
    })
  }

  updateBook = (book) => {
    let old_books = this.state.books;
    const idx = old_books.findIndex(old_book => old_book.id === book.id);
    old_books[idx] = book;
    this.setState(
        {books: old_books}
    )
  };

  isAnyBookSelected = (status) => {
    this.setState(
        {anyBookSelected: status}
    )
  };

  render() {
    const {books, anyBookSelected} = this.state;
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Tabs>
              <TabList>
                <Tab>Currently Reading</Tab>
                <Tab>Want to Read</Tab>
                <Tab>Read</Tab>
              </TabList>

              <TabPanel>
                <BookShelf shelf={'currentlyReading'}
                           books={books}
                           isAnyBookSelected={this.isAnyBookSelected}
                           updateBook={this.updateBook}/>
              </TabPanel>
              <TabPanel>
                <BookShelf shelf={'wantToRead'}
                           books={books}
                           isAnyBookSelected={this.isAnyBookSelected}
                           updateBook={this.updateBook}/>
              </TabPanel>
              <TabPanel>
                <BookShelf shelf={'read'}
                           books={books}
                           isAnyBookSelected={this.isAnyBookSelected}
                           updateBook={this.updateBook}/>
              </TabPanel>
            </Tabs>
          </div>
          {!anyBookSelected &&
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
          }
        </div>
    )
  }
}


export default BookList
