import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import ReviewsModal from '../components/ReviewsModal'
import DirectionsModal from '../components/DirectionsModal'

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
    price: 0,
    sort_by: 'best_match',
    markers: [],
  }

  // open or close reviews modal
  toggleReviews = () => this.setState({ reviewsModal: !this.state.reviewsModal })

  // open or close directions modal
  toggleDirections = () => this.setState({ directionsModal: !this.state.directionsModal })

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }
  
  // search
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ page: 0 }, () => {
      let { term, location, offset, sort_by } = this.state
      API.search(term, location, offset, sort_by)
        .then(res => {
          console.log(res.data.businesses)
          this.setState({ 
            results: res.data.businesses,
            search: true 
          }, () => {
            this.initMarkers()
          })
        })
    })
  }

  // initialize markers on map
  initMarkers = () =>  {
    // initiate map
    const google = window.google
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {
        lat: this.state.results[0].coordinates.latitude, 
        lng: this.state.results[0].coordinates.longitude 
      },
      mapTypeControl: false,
      streetViewControl: false
    })

    // add markers
    let newMarkers = []
    this.state.results.forEach(item => {
      map.setCenter({ lat: item.coordinates.latitude, lng: item.coordinates.longitude })

      let marker = new google.maps.Marker({
        map: map,
        position: map.center,
        id: item.id,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      })

      newMarkers.push(marker)

      let infowindow = new google.maps.InfoWindow({
        content: `<strong>${item.name}</strong>`,
        maxWidth: 300
      })

      marker.addListener('mouseover', () => infowindow.open(map, marker))
      marker.addListener('mouseout', () => infowindow.close(map, marker))
      marker.addListener('click', () => {
        let markerID = marker.get('id')
        document.getElementById(markerID).scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      })
    })

    this.setState({  markers: newMarkers })
  }

  // next and previous page buttons
  changePage = event => {
    window.scrollTo(0, 0)
    if (event.target.textContent === 'Next Page') {
      // go to next page of results
      this.setState({ 
        page: this.state.page + 1,
      }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset, this.state.sort_by)
            .then(res => {
              console.log(res.data.businesses)
              this.setState({ results: res.data.businesses }, () => this.initMarkers())
            })
        })
      })
    } else {
      // go to previous page of results
      this.setState({ 
        page: this.state.page - 1,
      }, () => {
        this.setState({ offset: this.state.page * 20 }, () => {
          API.search(this.state.term, this.state.location, this.state.offset, this.state.sort_by)
            .then(res => {
              console.log(res.data.businesses)
              this.setState({ results: res.data.businesses }, () => this.initMarkers())
            })
        })
      })
    }
  }

  // get yelp reviews
  handleReviews = url => {
    API.getReviews(url)
      .then(res => {
        this.setState({ reviews: res.data }, () => {
          this.toggleReviews()
        })
      })
      .catch(err => console.log(err))
  }

  handleFilter = event => {
    let filter = event.target.getAttribute('data-filter')
    let val = event.target.getAttribute('data-val')
    this.setState({ [filter]: val }, () => {
      
      // search based on new filters 
      if (filter === 'sort_by') {
        let { term, location, offset, sort_by } = this.state
        API.search(term, location, offset, sort_by)
          .then(res => {
            console.log(res.data.businesses)
            this.setState({ 
              results: res.data.businesses,
              search: true 
            }, () => this.initMarkers())
          })
      } else if (filter === 'price') {
        let { term, location, offset, sort_by, price } = this.state
        API.filterPrice(term, location, offset, sort_by, price)
          .then(res => {
            console.log(res.data.businesses)
            this.setState({ 
              results: res.data.businesses,
              search: true 
            }, () => this.initMarkers())
          })
      }
    })
  }

  handleMouseOver = id => {
    const google = window.google
    this.state.markers.forEach(item => {
      if (id === item.get('id')) item.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
    })
  }

  handleMouseOut = id => {
    const google = window.google
    this.state.markers.forEach(item => {
      if (id === item.get('id')) item.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    })
  }

  handleDirections = (location, coordinates) => {
    sessionStorage['end'] = location 
    sessionStorage['latitude'] = coordinates.latitude
    sessionStorage['longitude'] = coordinates.longitude
    this.toggleDirections()
  }

  initDirectionsMap = () => {
    const google = window.google
    let directionsDisplay = new google.maps.DirectionsRenderer
    let directionsService = new google.maps.DirectionsService
    let map = new google.maps.Map(document.getElementById('directions-map'), {
      zoom: 10,
      center: { lat: this.state.results[0].coordinates.latitude, lng: this.state.results[0].coordinates.longitude },
      mapTypeControl: false,
      streetViewControl: false
    })
    directionsDisplay.setMap(map)
    directionsDisplay.setPanel(document.getElementById('right-panel'))

    let control = document.getElementById('floating-panel')
    control.style.display = 'block'
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control)

    let onChangeHandler = function() {
      let start = document.getElementById('start').value
      let end = sessionStorage['end']
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }
    document.getElementById('submit').addEventListener('click', onChangeHandler)
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
          handleFilter={this.handleFilter}
          cats={this.state.categories}
        />

        <ReviewsModal
          isOpen={this.state.reviewsModal}
          toggle={this.toggleReviews}
          body={this.state.reviews.length ? this.state.reviews.map(review => <p className="mb-5">{review}</p>) : ''}
        />

        <DirectionsModal
          isOpen={this.state.directionsModal}
          toggle={this.toggleDirections}
          initMap={this.initDirectionsMap}
        />
        
        <div className="row">
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
                      />
                    </div>
                  )
                })
              ) : ''
            }
          </div>
          <div className="col-lg-5">
            <div style={{ position: 'sticky', top: '5em' }}>
              <div id="map" className="text-center" style={{ width: '100%', height: '20em' }}></div>
            </div>
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