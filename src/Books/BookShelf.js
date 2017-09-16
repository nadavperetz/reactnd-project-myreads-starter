import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

import Spinner from '../Animation/Spinner'



class BookShelf extends Component{

    static propTypes = {
        books : PropTypes.object.isRequired,
        changeShelf:  PropTypes.func.isRequired
    };

    render() {
        const {books, shelfName, changeShelf} = this.props;
        return (
            <div className="bookshelf">
                <div className="bookshelf-books">
                    {books.length > 0 ?
                        <ol className="books-grid">
                            {books.map((book) =>
                                <Book key={book.id} book={book} changeShelf={changeShelf}/>)}
                        </ol>
                        :
                        <Spinner/>
                    }
                </div>
            </div>
        )
    }
}

export default BookShelf