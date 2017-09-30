import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import sortBy from 'sort-by'

class BookList extends Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
        })
    }

    changeShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((data) => {
            let old_books = this.state.books;
            const idx = old_books.findIndex(old_book => old_book.id === book.id);
            book.shelf = new_shelf;
            old_books[idx] = book;
            this.setState({books: old_books}
            )
        })
    };


    render() {
        const {books} = this.state;
        books.sort(sortBy('name'));
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
                            <BookShelf books={books.filter((book) => book.shelf === 'currentlyReading')}
                                       changeShelf={this.changeShelf}/>
                        </TabPanel>
                        <TabPanel>
                            <BookShelf books={books.filter((book) => book.shelf === 'wantToRead')}
                                       changeShelf={this.changeShelf}/>
                        </TabPanel>
                        <TabPanel>
                            <BookShelf books={books.filter((book) => book.shelf === 'read')}
                                       changeShelf={this.changeShelf}/>
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}


export default BookList
