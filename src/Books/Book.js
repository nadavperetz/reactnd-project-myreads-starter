import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    bookSelected: PropTypes.func.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  changeSelectionShelf = (e) => {
    if (e.target.value !== this.props.book.shelf) {
      this.props.changeShelf(this.props.book, e.target.value)
    }
  };

  bookSelected = (e) => {
    const clicked = e.target.checked;
    this.props.bookSelected(clicked, this.props.book);
  };

  render() {
    const {book} = this.props;
    // Found a book without smallThumbnail...
    const smallThumbnail = (book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : "";
    return (
        <li>
          <div className='book'>
            <div className="book-top">
              <Link to={"detail/" + book.id}>
                <div className='book-cover' style={{
                  width: 128, height: 193,
                  backgroundImage: `url("${smallThumbnail}")`
                }}>

                </div>
              </Link>
              <div className="book-shelf-changer">
                <select onChange={this.changeSelectionShelf} value={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>

            <div className="book-title">
              <input type="checkbox" className="book-click-checkbox" id="check2"
                     onChange={this.bookSelected}/>
              &nbsp;{book.title}
            </div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
    )
  }
}


export default Book
