import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import FavResults from '../components/FavResults'
import ReviewsModal from '../components/ReviewsModal'
import DirectionsModal from '../components/DirectionsModal'
import maps from '../utils/maps'

class Profile extends React.Component {

  state = {
    favs: [],
    reviews: [],
    reviewsModal: false,
    directionsModal: false
  }
  
  componentDidMount() {
    API.getFavs().then(res => {
      this.setState({ favs: res.data }, () => console.log(this.state.favs))
    })
  }

  toggleReviews = () => this.setState({ reviewsModal: !this.state.reviewsModal })
  toggleDirections = () => this.setState({ directionsModal: !this.state.directionsModal })

  // get yelp reviews
  handleReviews = url => {
    API.getReviews(url).then(res => {
      this.setState({ reviews: res.data }, () => this.toggleReviews())
    })
    .catch(err => console.log(err))
  }

  // get directions data
  handleDirections = (location, coordinates) => {
    sessionStorage['end'] = location 
    sessionStorage['latitude'] = coordinates.latitude
    sessionStorage['longitude'] = coordinates.longitude
    this.toggleDirections()
  }

  handleDelete = () => {
    
  }

  render() {
    return (
      <div>

        <Navbar />
        <h1>My Spots</h1>
        { 
          this.state.favs.length ? (
            this.state.favs.map(spot => {
              return (
                <div key={spot._id}>
                  <FavResults 
                    id={spot._id}
                    image={spot.image}
                    name={spot.name}
                    location={spot.address}
                    phone={spot.phone}
                    cat={spot.category}
                    price={spot.price}
                    rating={spot.rating}
                    review_count={spot.reviewCount}
                    url={spot.url}
                    reviews={() => this.handleReviews(spot.url)}
                    handleDirections={() => this.handleDirections(spot.address, spot.coordinates)}
                    handleDelete={() => this.handleDelete(spot._id)}
                  />
                </div>
              )
            })
          ) : ''
        }

        <ReviewsModal
          isOpen={this.state.reviewsModal}
          toggle={this.toggleReviews}
          body={this.state.reviews.length ? this.state.reviews.map((review, i) => <p key={i} className="mb-5">{review}</p>) : ''}
        />

        <DirectionsModal
          isOpen={this.state.directionsModal}
          toggle={this.toggleDirections}
          initMap={() => maps.initDirectionsMap(this.state.favs[0])}
        />

      </div>
    )
  }
}

export default Profile