import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component{

    state = {
        query: '',
        books: []
    };
    updateQuery = (query) => {
        this.setState({query : query.trim()});
        BooksAPI.search(query, 10).then((books) =>
            this.setState({books : books}))
    };

    changeShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((data) => {
            this.setState({books: this.state.books.filter((b) => b.id !== book.id)}
            )
        })
    };

    render() {
        const {books, query} = this.state;
        books.sort(sortBy('name'));
        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
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

