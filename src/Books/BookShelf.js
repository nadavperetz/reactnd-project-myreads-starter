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
        updateBooks: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    };


    changeShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((data) => {
            let old_books = this.props.books;
            const idx = old_books.findIndex(old_book => old_book.id === book.id);
            book.shelf = new_shelf;
            old_books[idx] = book;
            this.props.updateBooks(old_books);
        })
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
    };

    render() {
        const {books, shelf} = this.props;
        let isSearch = false;
        let showingBooks =books;
        if (this.props.shelf === 'search')
            isSearch = true;
        else
           showingBooks = books.filter((book) => book.shelf === shelf);
        const classNameMaster = isSearch ? 'search-books-results' : 'bookshelf';
        return (

            <div className={classNameMaster}>
                <div className="bookshelf-books">
                    {showingBooks.length > 0 ?
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
            </div>
        )
    }
}

export default BookShelf