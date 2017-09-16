import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

import Spinner from '../Animation/Spinner'



class BookShelf extends Component{

    static propTypes = {
        books : PropTypes.object.isRequired,
        shelfName:  PropTypes.string.isRequired,
        changeShelf:  PropTypes.func.isRequired
    };

    render() {
        const {books, shelfName, changeShelf} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
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