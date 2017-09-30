import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookDetail extends Component {

    state = {
        book: []
    };

    static propTypes = {
        book: PropTypes.object,

    };

    getBook(){
        let bookId = this.props.match.params.bookID;
        BooksAPI.get(bookId).then((book) => {
            this.setState({book: book})
        })
    }

    componentDidMount() {
        if (this.props.book === undefined) {
            this.getBook()
        }
        else{
            this.setState({book: this.props.book})
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}


export default BookDetail