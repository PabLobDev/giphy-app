import React, { Component, Fragment } from 'react';
import {Button, Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import Content from './Content';


class App extends Component {

   constructor(){
     super();
    
    this.state = {
      gifs: []
    }

    this.addGif = this.addGif.bind(this)

   }

   async apicall() {
    try {

      let response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=0kmPgdiGwgWfOpBLzjde9ssqubglWqH5&tag=&rating=g')
      let gif = await response.json()
      console.log(gif)
      return gif

    } catch (error) {
      console.log(error)
    } 
   }

    async addGif() {
      let newGif = await this.apicall()
      this.setState({
        gifs: [
          ...this.state.gifs,
          {
            image : newGif.data.images.original.url,
            title : newGif.data.title
          }
        ]
      }
      )

    }

  render() {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
          <Container>
            <Navbar.Brand href="home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Anothe action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ms-auto">
                <Button onClick={this.addGif} variant="success">Cargar Random</Button>
              </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Content 
        gifs={this.state.gifs}
        />
      </Fragment>
    );
  }

  async componentDidMount(){
    try {

      let response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=0kmPgdiGwgWfOpBLzjde9ssqubglWqH5&limit=4&rating=g')
      let gifs = await response.json()
      //console.log(gifs)
      
      let newGifs = gifs.data.map(gif => {
        let item = {
          image : gif.images.original.url,
          title : gif.title
        }
        return item
      })
        this.setState(
          {   
          gifs : [
            ...this.state.gifs,
            ...newGifs
          ]
        }
        )
      console.log(this.state.gifs)
      
    } catch (error) {
      console.log(error)
    } 

   
  }

 componentDidUpdate()  {
   console.log('Nuevo gif añadido!')
 }

}

export default App;
