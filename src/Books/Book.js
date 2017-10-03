import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    state = {
        shelf: this.props.book.shelf
    };

    static propTypes = {
        book: PropTypes.object.isRequired,
        bookSelected: PropTypes.func.isRequired,
        changeShelf: PropTypes.func.isRequired,
    };

    changeSelectionShelf = (e) => {
        if (e.target.value !== this.state.shelf) {
            this.props.changeShelf(this.props.book, e.target.value)
        }
    };

    bookSelected = (e) => {
        const clicked =  e.target.checked;
        this.props.bookSelected(clicked, this.props.book);
    };

    render() {
        const {book} = this.props;
        const {shelf} = this.state;
        return (
            <li>
                <div className='book'>
                    <div className="book-top">
                        <div className='book-cover' style={{
                            width: 128, height: 193,
                            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                        }}>

                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={this.changeSelectionShelf} value={shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>

                    <div className="book-title">
                        <input type="checkbox"  className="book-click-checkbox" id="check2"
                        onChange={this.bookSelected}/>
                        {book.title}
                    </div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}


export default Book
