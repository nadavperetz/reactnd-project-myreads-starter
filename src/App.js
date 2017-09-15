import React from 'react'
import './App.css'
import BookList from './BookList'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <BookList />
                </div>
            </div>
        )
    }
}

export default BooksApp
