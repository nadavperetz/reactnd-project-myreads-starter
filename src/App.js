import React from 'react'
import {Route} from 'react-router-dom'

import './App.css'
import BookList from './Books/BookList'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                    <Route exact path="/" render={() => (
                        <BookList />)
                    }/>

            </div>
        )
    }
}

export default BooksApp
