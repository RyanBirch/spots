import React from 'react'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import ReviewsModal from '../components/ReviewsModal'
import DirectionsModal from '../components/DirectionsModal'
import FavModal from '../components/FavModal'
import PromptLogin from '../components/PromptLogin'
import maps from '../utils/maps'
import Navbar from '../components/Navbar'

class Search extends React.Component {

  state = {
    term: '',
    location: '',
    page: 0,
    offset: 0,
    results: [], 
    search: false, 
    reviews: [],
    reviewsModal: false,
    directionsModal: false,
    favModal: false,
    promptLogin: false,
    price: 0,
    sort_by: 'best_match',
    markers: [],
    fav: ''
  }

  // search using inputs from home page
  componentDidMount() {
    let what = sessionStorage['what']
    let where = sessionStorage['where']
    if (what && where) {
      this.setState({ term: what, location: where }, () => {
        API.search(what, where, 0, 'best_match').then(res => {
          if (res.data.businesses[0]) {
            this.setState({ 
              results: res.data.businesses,
              search: true 
            }, () => {
              let newMarkers = maps.initMarkers(this.state.results)
              this.setState({ markers: newMarkers })
            })
          }
        })
      })
    }
  }

  // open or close modals
  toggleReviews = () => this.setState({ reviewsModal: !this.state.reviewsModal })
  toggleDirections = () => this.setState({ directionsModal: !this.state.directionsModal })
  toggleFav = () => this.setState({ favModal: !this.state.favModal })
  toggleLoginPrompt = () => this.setState({ promptLogin: !this.state.promptLogin })

  // get form input
  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }
  
  // search
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ page: 0 }, () => {
      let { term, location, offset, sort_by } = this.state
      API.search(term, location, offset, sort_by).then(res => {
        if (res.data.businesses[0]) {
          this.setState({ 
            results: res.data.businesses,
            search: true 
          }, () => {
            let newMarkers = maps.initMarkers(this.state.results)
            this.setState({ markers: newMarkers })
          })
        }
      })
    })
  }

  // next and previous page buttons
  changePage = event => {
    window.scrollTo(0, 0)
    if (event.target.textContent === 'Next Page') {
      // go to next page of results
      this.setState({ page: this.state.page + 1 }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset, this.state.sort_by).then(res => {
            if (res.data.businesses[0]) {
              this.setState({ results: res.data.businesses }, () => {
                let newMarkers = maps.initMarkers(this.state.results)
                this.setState({ markers: newMarkers })
              })
            }
          })
        })
      })
    } else {
      // go to previous page of results
      this.setState({ page: this.state.page - 1 }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset, this.state.sort_by).then(res => {
            if (res.data.businesses[0]) {
              this.setState({ results: res.data.businesses }, () => {
                let newMarkers = maps.initMarkers(this.state.results)
                this.setState({ markers: newMarkers })
              })
            }
          })
        })
      })
    }
  }

  // get yelp reviews
  handleReviews = url => {
    API.getReviews(url).then(res => {
      this.setState({ reviews: res.data }, () => this.toggleReviews())
    })
    .catch(err => console.log(err))
  }

  // filter search 
  handleFilter = event => {
    let filter = event.target.getAttribute('data-filter')
    let val = event.target.getAttribute('data-val')
    this.setState({ [filter]: val }, () => {
      // search based on new filters 
      if (filter === 'sort_by') {
        let { term, location, offset, sort_by } = this.state
        API.search(term, location, offset, sort_by).then(res => {
          if (res.data.businesses[0]) {
            this.setState({ 
              results: res.data.businesses,
              search: true 
            }, () => {
              let newMarkers = maps.initMarkers(this.state.results)
              this.setState({ markers: newMarkers })
            })
          }
        })
      } else if (filter === 'price') {
        let { term, location, offset, sort_by, price } = this.state
        API.filterPrice(term, location, offset, sort_by, price).then(res => {
          if (res.data.businesses[0]) {
            this.setState({ 
              results: res.data.businesses,
              search: true 
            }, () => {
              let newMarkers = maps.initMarkers(this.state.results)
              this.setState({ markers: newMarkers })
            })
          }
        })
      }
    })
  }

  // highlight map markers on hover
  handleMouseOver = id => {
    this.state.markers.forEach(item => {
      if (id === item.get('id')) item.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
    })
  }

  // markers go back to original color when you hover off them
  handleMouseOut = id => {
    this.state.markers.forEach(item => {
      if (id === item.get('id')) item.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    })
  }

  // get directions data
  handleDirections = (location, coordinates) => {
    sessionStorage['end'] = location 
    sessionStorage['latitude'] = coordinates.latitude
    sessionStorage['longitude'] = coordinates.longitude
    this.toggleDirections()
  }

  // if user is logged in, show favorites modal, if not, prompt to log in
  handleFav = spot => {
    if (localStorage['token']) {
      this.setState({ fav: spot }, () => this.toggleFav())
    }
    else this.toggleLoginPrompt()
  }

  // post location data for favorites list to back end
  pushFav = selected => {
    console.log(selected)
    
    let fav = this.state.fav
    let favToAdd = {
      name: fav.name,
      image: fav.image_url,
      address: fav.location.display_address.join(' '),
      phone: fav.phone,
      category: fav.categories[0].title,
      price: fav.price,
      rating: fav.rating,
      reviewCount: fav.review_count,
      url: fav.url,
      coordinates: {
        latitude: fav.coordinates.latitude,
        longitude: fav.coordinates.longitude
      }
    }

    if (selected === 'favorites') {
      // this will add to favorites
      API.addToList(favToAdd).then(res => {
        this.toggleFav()
      })
      .catch(err => console.log(err))
    } else {
      // this will add to a custom list
      API.addToCustomList(selected, favToAdd).then(res => {
        console.log(res)
        this.toggleFav()
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div className="container">

        <Navbar />
        <SearchForm 
          term={this.state.term}
          location={this.state.location}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          handleFilter={this.handleFilter}
          cats={this.state.categories}
        />

        <ReviewsModal
          isOpen={this.state.reviewsModal}
          toggle={this.toggleReviews}
          body={this.state.reviews.length ? this.state.reviews.map((review, i) => <p key={i} className="mb-5">{review}</p>) : ''}
        />

        <DirectionsModal
          isOpen={this.state.directionsModal}
          toggle={this.toggleDirections}
          initMap={() => maps.initDirectionsMap(this.state.results[0])}
        />

        <FavModal 
          isOpen={this.state.favModal}
          toggle={this.toggleFav}
          pushFav={this.pushFav}
        />

        <PromptLogin
          isOpen={this.state.promptLogin}
          toggle={this.toggleLoginPrompt} 
        />
        
        <div className="row">
          {/* search results */}
          <div className="col-lg-7">
            {
              this.state.results.length ? (
                this.state.results.map(spot => {
                  return (
                    <div key={spot.id}>
                      <SearchResults 
                        id={spot.id}
                        image={spot.image_url}
                        name={spot.name}
                        location={spot.location.display_address.join(' ')}
                        phone={spot.display_phone}
                        cat={spot.categories[0].title}
                        price={spot.price}
                        rating={spot.rating}
                        review_count={spot.review_count}
                        url={spot.url}
                        reviews={() => this.handleReviews(spot.url)}
                        handleMouseOver={() => this.handleMouseOver(spot.id)}
                        handleMouseOut={() => this.handleMouseOut(spot.id)}
                        handleDirections={() => this.handleDirections(spot.location.display_address.join(' '), spot.coordinates)}
                        handleFav={() => this.handleFav(spot)}
                      />
                    </div>
                  )
                })
              ) : ''
            }
          </div>
          {/* google map */}
          <div className="col-lg-5">
            <div style={{ position: 'sticky', top: '5em' }}>
              <div id="map" className="text-center" style={{ width: '100%', height: '20em' }}></div>
            </div>
          </div>
        </div>

        <div className="text-center">
          {this.state.page > 0 ? <button className="btn btn-primary m-4" onClick={this.changePage}>Prev Page</button> : ''}
          {this.state.search ? <button className="btn btn-primary m-4" onClick={this.changePage}>Next Page</button> : ''}
        </div>

      </div>
    )
  }
}

export default Search