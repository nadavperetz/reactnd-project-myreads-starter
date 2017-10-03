import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

import Spinner from '../Animation/Spinner'



class BookShelf extends Component{

    static propTypes = {
        books : PropTypes.array.isRequired,
        bookSelected: PropTypes.func.isRequired,
        changeShelf: PropTypes.func.isRequired,
    };

    bookSelected = (checked, book) => {
        this.props.bookSelected(checked, book);
    };

    render() {
        const {books, changeShelf} = this.props;
        return (
            <div className="bookshelf">
                <div className="bookshelf-books">
                    {books.length > 0 ?
                        <ol className="books-grid">
                            {books.map((book) =>
                                <Book key={book.id}
                                      book={book}
                                      changeShelf={changeShelf}
                                      bookSelected={this.bookSelected}
                                />)}
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