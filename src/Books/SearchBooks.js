import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './API/BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component {

    state = {
        books: [],
        clickedBooks: [],
        asyncRunning: false,
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

    addToShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then( () => {
            this.setState({books: this.state.books.filter((b) => b.id !== book.id)}
            )
        })
    };

    addSelectionToShelf = (e) => {
        const newShelf = e.target.value;
        this.setState({asyncRunning: true});
        for (let clickedBook of this.state.clickedBooks) {
            this.addToShelf(clickedBook, newShelf)
        }
        this.setState({asyncRunning: false});
    };


    bookClicked = (book) => {
        console.log(book);

    };

    render() {
        const {books, asyncRunning} = this.state;
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
                                      changeShelf={this.addToShelf}
                                      bookClicked={this.bookClicked}
                                />)
                            }
                        </ol>
                    }
                    {!asyncRunning &&
                    <div className="move-on-batch">
                        <select onChange={this.addSelectionToShelf} value='none'>
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

