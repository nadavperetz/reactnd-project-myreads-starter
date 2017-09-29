import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

import Spinner from '../Animation/Spinner'



class BookShelf extends Component{

    state = {
        anyClicked: false,
        clickedBooks: []
    };

    static propTypes = {
        books : PropTypes.array.isRequired,
        changeShelf:  PropTypes.func.isRequired,
    };

    bookClicked = (book) => {
        book.clicked =  (book.hasOwnProperty('clicked') ? !book.clicked : true) ;

        let clickedBooks = this.state.clickedBooks;
        let idx = clickedBooks.findIndex(eachBook => eachBook.id === book.id);

        (idx >= 0) ? clickedBooks.splice(idx, 1) : clickedBooks.push(book);

        if (clickedBooks.length > 0)
            this.setState(
                {
                    anyClicked: true,
                    clickedBooks: clickedBooks
                }
            );

        else
            this.setState(
                {
                    anyClicked: false,
                    clickedBooks: clickedBooks
                }
            );

    };

    render() {
        const {books, changeShelf} = this.props;
        return (
            <div className="bookshelf">
                <div className="bookshelf-books">
                    {books.length > 0 ?
                        <ol className="books-grid">
                            {books.map((book) =>
                                <Book key={book.id}
                                      book={book}
                                      changeShelf={changeShelf}
                                      anyClicked={this.state.anyClicked}
                                      bookClicked={this.bookClicked}
                                />)}
                        </ol>
                        :
                        <Spinner/>
                    }
                </div>
            </div>
        )
    }
}

export default BookShelf