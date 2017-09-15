import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'

class BooksApp extends React.Component {
    state = {
        books : []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            console.log(books);
                this.setState({books: books})
            }
        )
    }

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <BookList books={this.state.books} />
                </div>
            </div>
        )
    }
}

export default BooksApp
