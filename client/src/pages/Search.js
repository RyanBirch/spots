import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import ReviewsModal from '../components/ReviewsModal'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0,
    results: [], 
    search: false, 
    reviews: [],
    modal: false
  }

  toggle = () => this.setState({ modal: !this.state.modal })

  componentDidMount() {
    API.search('breakfast', 'orlando', this.state.offset)
      .then(res => {
        console.log(res.data.businesses)
        this.setState({ results: res.data.businesses })
      })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  // search
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
      // go to next page of results
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
      // go to previous page of results
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

  // get yelp reviews
  handleReviews = id => {
    API.getReviews(id)
      .then(res => {
        console.log(res)
        this.toggle()
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

        <ReviewsModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          body={this.state.reviews.length ? this.state.reviews : ''}
        />
        
        <div className="row">
          <div className="col-lg-7">
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
                        reviews={() => this.handleReviews(spot.id)}
                      />
                    </div>
                  )
                })
              ) : ''
            }
          </div>
          <div className="col-lg-5">
            <p className="text-center" style={{ position: 'sticky', top: '5em' }}>Map will go here</p>
          </div>
        </div>

        <div className="text-center">
          {this.state.page > 0 ? <button className="btn btn-info m-4" onClick={this.changePage}>Prev Page</button> : ''}
          {this.state.search ? <button className="btn btn-info m-4" onClick={this.changePage}>Next Page</button> : ''}
        </div>

      </div>
    )
  }
}

export default Search