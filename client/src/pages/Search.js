import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0,
    results: [], 
    search: false
  }

  // componentDidMount() {
  //   API.search('breakfast', 'orlando', this.state.offset)
  //     .then(res => {
  //       console.log(res.data.businesses)
  //       this.setState({ results: res.data.businesses })
  //     })
  // }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ page: 0 }, () => {
      API.search(this.state.term, this.state.location, this.state.offset)
        .then(res => {
          console.log(res.data.businesses)
          this.setState({ 
            results: res.data.businesses,
            search: true 
          })
        })
    })
  }

  changePage = event => {
    window.scrollTo(0, 0)
    if (event.target.textContent === 'Next Page') {
      this.setState({ 
        page: this.state.page + 1,
      }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset)
            .then(res => {
              console.log(res.data.businesses)
              this.setState({ results: res.data.businesses })
            })
        })
      })
    } else {
      this.setState({ 
        page: this.state.page - 1,
      }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset)
            .then(res => {
              console.log(res.data.businesses)
              this.setState({ results: res.data.businesses })
            })
        })
      })
    }
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
                  <SearchResults 
                    image={spot.image_url}
                    name={spot.name}
                    location={spot.location.display_address.join(' ')}
                    phone={spot.display_phone}
                    cat={spot.categories[0].title}
                    price={spot.price}
                    rating={spot.rating}
                    review_count={spot.review_count}
                    url={spot.url}
                  />
                </div>
              )
            })
          ) : ''
        }

        <div className="text-center">
          {this.state.page > 0 ? <button className="btn btn-info m-4" onClick={this.changePage}>Prev Page</button> : ''}
          {this.state.search ? <button className="btn btn-info m-4" onClick={this.changePage}>Next Page</button> : ''}
        </div>
      </div>
    )
  }
}

export default Search