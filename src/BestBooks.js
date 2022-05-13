
  
import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import bookImg from './book.jpg';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`;
      const booksResponse = await axios.get(url);
      console.log(booksResponse.data);
      this.setState({books: booksResponse.data});
    } catch (error) {
      console.error(error);
    }
  }


  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item key={book._id} >
            <img
              className="d-block w-100"
              src={bookImg}
              alt={book.title}
              />
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
            </Carousel.Caption>
          </Carousel.Item>
              ))}
        </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;