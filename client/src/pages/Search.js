import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0
  }

  componentDidMount() {
    API.search('bar', 'orlando')
      .then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <h1 className="text-center">Search Page</h1>
        </div>
      </div>
    )
  }
}

export default Search