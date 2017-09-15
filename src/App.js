import React from 'react'
import {Route} from 'react-router-dom'

import './App.css'
import BookList from './Books/BookList'
import SearchBooks from './Books/SearchBooks'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                    <Route exact path="/" render={() => (
                        <BookList />)
                    }/>
                    <Route exact path="/search" render={() => (
                        <SearchBooks />)
                    }/>

            </div>
        )}
}

export default BooksApp
