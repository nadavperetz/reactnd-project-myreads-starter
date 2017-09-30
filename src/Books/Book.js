import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{

    state = {
        shelf : this.props.book.shelf,
    };

    static propTypes = {
        book : PropTypes.object.isRequired,
        changeShelf : PropTypes.func.isRequired,
        anyClicked : PropTypes.bool.isRequired,
        bookClicked : PropTypes.func.isRequired,
    };

    changeSelectionShelf = (e) => {
        if (e.target.value !== this.state.shelf){
            this.props.changeShelf(this.props.book, e.target.value)
        }

    };

    isClicked = () => {
        let clicked;
        if (this.props.book.hasOwnProperty('clicked')){
            clicked = this.props.book.clicked;
        }
        else{
            clicked = false;
        }
        return clicked;
    };

    onBookClicked = () => {
        this.props.bookClicked(this.props.book);
    };

    render() {
        const {book, anyClicked} = this.props;
        const {shelf} = this.state;
        const bookClassName = this.isClicked() ? 'book-cover-clicked' : 'book-cover';
        return (
            <li>
                <div className='book'>
                    <div className="book-top">
                        <div className={bookClassName}  onClick={this.onBookClicked} style={{ width: 128, height: 193,
                            backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}>

                        </div>
                        {!anyClicked &&
                        <div className="book-shelf-changer">
                            <select onChange={this.changeSelectionShelf} value={shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                        }
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}


export default Book
