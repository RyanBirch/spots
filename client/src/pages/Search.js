import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0,
    results: []
  }

  componentDidMount() {
    API.search('breakfast', 'orlando')
      .then(res => {
        console.log(res.data.businesses)
        this.setState({ results: res.data.businesses })
      })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    API.search(this.state.term, this.state.location)
      .then(res => {
        console.log(res.data.businesses)
        this.setState({ results: res.data.businesses })
      })
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

        {
          this.state.results.length ? (
            this.state.results.map(spot => {
              return (
                <div key={spot.id}>
                  <div className="card mb-3" style={{ maxWidth: "100%" }}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img src={spot.image_url} className="card-img" alt="..." height="300em" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{spot.name}</h5>
                          <p className="card-text">{spot.location.display_address.join(' ')}</p>
                          <p className="card-text">{spot.display_phone}</p>
                          {/* <p className="card-text">{spot.categories.map(cat => cat.title + ' ')}</p> */}
                          <p className="card-text">{spot.categories[0].title}</p>
                          <p className="card-text">{spot.price}</p>
                          <p className="card-text">Rating: {spot.rating} / 5</p>
                          <p className="card-text">Reviews: {spot.review_count}</p>
                          <p className="card-text"><a href={spot.url}>{spot.name}</a></p>
                          {/* <p className="card-text"><small className="text-muted">{spot.url}</small></p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : ''
        }
      </div>
    )
  }
}

export default Search