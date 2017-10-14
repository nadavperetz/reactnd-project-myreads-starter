import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../Animation/Spinner'
import * as BooksAPI from './API/BooksAPI'
import sortBy from 'sort-by'

import BookShelf from './BookShelf'

class SearchBooks extends Component {

    state = {
        books: [],
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
                    this.setState({books: data, asyncRunning: false})
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
    }

    render() {
        const {books, asyncRunning} = this.state;
        const showingBooks = books.filter((book) => book.shelf !== 'currentlyReading')
                                  .filter((book) => book.shelf !== 'wantToRead')
                                  .filter((book) => book.shelf !== 'read')
                                  .sort(sortBy('name'));
        console.log(showingBooks);
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

