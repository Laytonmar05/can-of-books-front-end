import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AddABookForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    };
    console.log("New book to be created:", newBook);
    this.props.createBook(newBook);
    this.props.handleClose();
  }

  render() {
    return (
      <Modal show={this.props.modalSwitch} onHide={this.props.handleClose} >
        <Modal.Header closeButton>
        <Modal.Title>Add A New Book To Your Bookshelf!</Modal.Title>
        </Modal.Header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="text" placeholder="book title here..." />
          </Form.Group>

          <Form.Group controlId="description" >
            <Form.Label>Book Description</Form.Label>
            <Form.Control type="text" placeholder="book description here..." />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select">
              <option value="LIFE CHANGING">LIFE CHANGING</option>
              <option value="FAVORITE FIVE">FAVORITE FIVE</option>
              <option value="RECOMMENDED TO ME">RECOMMENDED TO ME</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit">Add New Book</Button>
        </Form>

        <Modal.Footer>
          <Button>Cancel</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}

export default AddABookForm;