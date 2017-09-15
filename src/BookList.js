import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
class BookList extends Component{

    static propTypes = {
        books : PropTypes.array.isRequired,
    };
    render(){
        const {books} = this.props;
        return (

            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                    {books.map((book) =>
                                        <Book book={book}/>)
                                    }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        </div>
                    </div>
                </div>
            </div>
        )}
}


export default BookList
