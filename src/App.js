import React from 'react'
import {Route} from 'react-router-dom'

import './App.css'
import BookList from './Books/BookList'
import SearchBooks from './Books/SearchBooks'
import BookDetail from './Books/BookDetail'

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path="/" component={BookList}/>
                <Route exact path="/search/" component={SearchBooks}/>
                <Route exact path="/detail/:bookID" component={BookDetail}/>

            </div>
        )
    }
}

export default BooksApp
