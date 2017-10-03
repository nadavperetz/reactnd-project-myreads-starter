import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './API/BooksAPI'

class BookDetail extends Component {

    state = {
        book: []
    };

    static propTypes = {
        book: PropTypes.object,

    };

    getBook() {
        let bookId = this.props.match.params.bookID;
        BooksAPI.get(bookId).then((book) => {
            this.setState({book: book});
            console.log(this.state.book)
        })
    }

    componentDidMount() {
        this.getBook()
    }

    render() {
        const {book} = this.state;
        console.log(book);
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                    {book.map((attr) =>
                        <p key={attr.key}>attr.key - attr.value</p>)}

                </div>
            </div>
        )
    }
}


export default BookDetail
//
// authors
//     :
//     ["Liaquat Ahamed"]
// averageRating
//     :
//     4.5
// canonicalVolumeLink
//     :
//     "https://books.google.com/books/about/Lords_of_Finance.html?hl=&id=74XNzF_al3MC"
// categories
//     :
//     ["Business & Economics"]
// contentVersion
//     :
//     "1.0.0.0.preview.0"
// description
//     :
//     "Argues that the stock market crash of 1929 and subsequent Depression occurred as a result of poor decisions on the part of four central bankers who jointly attempted to reconstruct international finance by reinstating the gold standard."
// id
//     :
//     "74XNzF_al3MC"
// imageLinks
//     :
// infoLink
//     :
//     "http://books.google.com/books?id=74XNzF_al3MC&dq=finance&hl=&source=gbs_api"
// language
//     :
//     "en"
// maturityRating
//     :
//     "NOT_MATURE"
// pageCount
//     :
//     564
// previewLink
//     :
//     "http://books.google.com/books?id=74XNzF_al3MC&printsec=frontcover&dq=finance&hl=&cd=1&source=gbs_api"
// printType
//     :
//     "BOOK"
// publishedDate
//     :
//     "2009-01"
// publisher
//     :
//     "Penguin"
// ratingsCount
//     :
//     14
// readingModes
//     :
// shelf
//     "currentlyReading"
// subtitle
//     "The Bankers Who Broke the World"
// title
//     "Lords of Finance"