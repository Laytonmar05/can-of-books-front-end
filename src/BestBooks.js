import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import bookImg from "./book.jpeg";
import Button from "react-bootstrap/Button";
import AddABookForm from "./AddABookForm";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      modalSwitch: false
    };
  }

  componentDidMount = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`;
      const booksResponse = await axios.get(url);
      console.log(booksResponse.data);
      this.setState({ books: booksResponse.data });
    } catch (error) {
      console.error(error);
    }
  };

  createBook = async (newBook) => {
    try {
      const config = {
        method: "post",
        baseURL: process.env.REACT_APP_SERVER,
        url: "/books/",
        data: newBook
      };

      const bookResults = await axios(config);
      console.log("Book results from Axios:" , bookResults);

      const updatedBooks = [...this.state.books, bookResults.data];
      this.setState({books: updatedBooks});

    } catch (error) {
      console.error(error);
    }
  }

  handleClose = () => this.setState({modalSwitch: false});

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.setState({modalSwitch: true})} >Add a Book!</Button>

        {this.state.modalSwitch && (
          <AddABookForm modalSwitch={this.state.modalSwitch} handleClose={this.handleClose} createBook={this.createBook} />
        )}

        {this.state.books.length ? (
          <Container>
            <Carousel id="carousel">
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
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
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;