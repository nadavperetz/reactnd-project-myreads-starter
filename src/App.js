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
                <BookList />
            </div>
        )
    }
}

export default BooksApp
