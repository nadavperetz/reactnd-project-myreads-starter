import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component {

    state = {
        books: [],
        clicked_books: [],
        async_running: false,
        any_clicked: false
    };

    inputKeyPressEvent = (event) => {
        let query = event.target.value;
        if (query && !this.state.async_running && (event.key === 'Enter')) {
            this.setState({async_running: true});
            BooksAPI.search(query, 10).then((data) => {
                if (data.error === "empty query") {
                    this.setState({async_running: false, books: []})
                }
                else {
                    data.sort(sortBy('name'));
                    this.setState({books: data, async_running: false})
                }
            })
        }
    };

    changeShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((data) => {
            this.setState({books: this.state.books.filter((b) => b.id !== book.id)}
            )
        })
    };

    changeBatchSelectionShelf = () => {

    }


    bookClicked = (book) => {
        if (book.hasOwnProperty('clicked')){
            book.clicked = !book.clicked;
        }
        else{
            book.clicked = true;
        }

        let clicked_books = this.state.clicked_books;
        let idx = clicked_books.findIndex(each_book => each_book.id === book.id);

        if (idx >= 0) {
            clicked_books.splice(idx, 1);
        }
        else{
            clicked_books.push(book);
        }
        if (clicked_books.length > 0)
            this.setState(
                {
                    any_clicked: true,
                    clicked_books: clicked_books
                }
            );

        else
            this.setState(
                {
                    any_clicked: false,
                    clicked_books: clicked_books
                }
            );

    };

    render() {
        const {books, async_running, any_clicked} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onKeyPress={(event) => this.inputKeyPressEvent(event)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {async_running ?
                        <Spinner/>
                        :
                        <ol className="books-grid">
                            {books.map((book) =>
                                <Book key={book.id}
                                      book={book}
                                      changeShelf={this.changeShelf}
                                      any_clicked={any_clicked}
                                      bookClicked={this.bookClicked}
                                />)
                            }
                        </ol>
                    }
                    {(any_clicked && !async_running) &&
                    <div className="move-on-batch">
                        <select onChange={this.changeBatchSelectionShelf} value='none'>
                            <option value="none" disabled>Move to...</option>
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

