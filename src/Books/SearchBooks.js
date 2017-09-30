import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component {

    state = {
        books: [],
        clickedBooks: [],
        asyncRunning: false,
        anyClicked: false
    };

    inputKeyPressEvent = (event) => {
        let query = event.target.value;
        if (query && !this.state.asyncRunning && (event.key === 'Enter')) {
            this.setState({asyncRunning: true});
            BooksAPI.search(query, 10).then((data) => {
                if (data.error === "empty query") {
                    this.setState({asyncRunning: false, books: []})
                }
                else {
                    data.sort(sortBy('name'));
                    this.setState({books: data, asyncRunning: false})
                }
            })
        }
    };

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then( () => {
            this.setState({books: this.state.books.filter((b) => b.id !== book.id)}
            )
        })
    };

    changeBatchSelectionShelf = (e) => {
        const newShelf = e.target.value;
        this.setState({asyncRunning: true});
        for (let clickedBook of this.state.clickedBooks) {
            this.changeShelf(clickedBook, newShelf)
        }
        this.setState({asyncRunning: false});
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
        const {books, asyncRunning, anyClicked} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Type title or author and press enter"
                               onKeyPress={(event) => this.inputKeyPressEvent(event)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {asyncRunning ?
                        <Spinner/>
                        :
                        <ol className="books-grid">
                            {books.map((book) =>
                                <Book key={book.id}
                                      book={book}
                                      changeShelf={this.changeShelf}
                                      anyClicked={anyClicked}
                                      bookClicked={this.bookClicked}
                                />)
                            }
                        </ol>
                    }
                    {(anyClicked && !asyncRunning) &&
                    <div className="move-on-batch">
                        <select onChange={this.changeBatchSelectionShelf} value='none'>
                            <option value="none" disabled> </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                    }
                </div>
            </div>
        )
    }
}


export default SearchBooks

