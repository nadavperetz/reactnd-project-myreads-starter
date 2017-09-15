import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component{

    state = {
        books: [],
        async_running: false
    };

    inputKeyPressEvent = (event) => {
        let query = event.target.value;
        if (query && !this.state.async_running && (event.key === 'Enter')) {
            this.setState({async_running : true});
            BooksAPI.search(query, 10).then((data) => {
                if (data.error === "empty query"){
                    this.setState({async_running: false, books:[]})
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

    render() {
        const {books} = this.state;
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
                    <ol className="books-grid">
                        {books.map((book) =>
                            <Book key={book.id} book={book} changeShelf={this.changeShelf}/>)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}


export default SearchBooks

