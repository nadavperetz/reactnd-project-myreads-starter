import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookList extends Component {

    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            console.log(books);
                this.setState({books: books})
            }
        )
    }

    changeShelf = (book, new_shelf) => {
        BooksAPI.update(book, new_shelf).then((data) => {
                let old_books = this.state.books;
                console.log(old_books);
                const idx = (old_books.findIndex((old_book) => old_book.id = book.id) - 1);
                book.shelf = new_shelf;
                old_books[idx] = book;
                this.setState({books: old_books}
                )
            }
        )
    };


    render() {
        const {books} = this.state;
        return (

            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === 'currentlyReading').map((book) =>
                                    <Book key={book.id} book={book} changeShelf={this.changeShelf}/>)
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === 'wantToRead').map((book) =>
                                    <Book key={book.id} book={book} changeShelf={this.changeShelf}/>)
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.filter((book) => book.shelf === 'read').map((book) =>
                                    <Book key={book.id} book={book} changeShelf={this.changeShelf}/>)
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BookList
