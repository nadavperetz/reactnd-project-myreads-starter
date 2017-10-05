import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'react-bootstrap';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaStar from 'react-icons/lib/fa/star'
import FaStarO from 'react-icons/lib/fa/star-o'
import * as BooksAPI from './API/BooksAPI'

import Spinner from '../Animation/Spinner'


class BookDetail extends Component {

  state = {
    book: null
  };

  static propTypes = {
    book: PropTypes.object,

  };

  getBook() {
    let bookId = this.props.match.params.bookID;
    BooksAPI.get(bookId).then((book) => {
      this.setState({book: book});
    })
  }

  componentDidMount() {
    this.getBook()
  }

  render() {
    const {book} = this.state;
    let starsMissing = [];
    let starsShowing = [];
    const imgStyle = {
      display: 'block',
      width: '100%',
      height: 'auto'
    };

    if (book){
      if (book.averageRating) {
        for (let i = 0; i < 5; i++) {
          if (i >= book.averageRating)
            starsMissing.push([]);
          else
            starsShowing.push([]);
        }
      }
    }

    return (
        <div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Row><br/></Row>
            {book ?
                <Row>
                  <Col md={2}/>
                  <Col md={2}>
                    <img src={`${book.imageLinks.thumbnail}`} alt='book' style={imgStyle}/>
                  </Col>
                  <Col md={6}>
                    <p><strong>{book.title}</strong> - {book.subtitle}</p>
                    <p>
                      {book.authors.map((author) => `${author}, `).join().slice(0, -2)}
                      ({book.publisher}, {book.publishedDate})
                    </p>
                    <p>
                      <FaThumbsOUp/> ({book.ratingsCount})
                      {starsShowing.map((_ , idx) => <FaStar key={idx}/>)}{starsMissing.map((_ , idx) => <FaStarO  key={idx}/>)}
                    </p>
                    <p>{book.description}</p>

                  </Col>

                </Row>
                :
                <Spinner/>
            }
          </div>
        </div>
    )
  }
}


export default BookDetail