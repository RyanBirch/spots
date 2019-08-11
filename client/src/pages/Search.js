import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0
  }

  componentDidMount() {
    // API.search('bar', 'orlando')
    //   .then(res => console.log(res))

    API.search('bar', 'orlando')
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    API.search(this.state.term, this.state.location)
  }

  render() {
    return (
      <div>
        <Navbar />
        <SearchForm 
          term={this.state.term}
          location={this.state.location}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Search