import React from 'react'
import API from '../utils/API'
import FavResults from '../components/FavResults'
import ReviewsModal from '../components/ReviewsModal'
import DirectionsModal from '../components/DirectionsModal'
import maps from '../utils/maps'
import DeleteModal from '../components/DeleteModal'
import Navbar from '../components/Navbar'
import CreateListModal from '../components/CreateListModal'

class Profile extends React.Component {

  state = {
    favs: [],
    reviews: [],
    reviewsModal: false,
    directionsModal: false,
    deleteModal: false,
    createListModal: false,
    newList: ''
  }
  
  // get favorites from database when page loads
  componentDidMount() {
    API.getFavs().then(res => {
      this.setState({ favs: res.data })
    })
  }

  // open or close modals
  toggleReviews = () => this.setState({ reviewsModal: !this.state.reviewsModal })
  toggleDirections = () => this.setState({ directionsModal: !this.state.directionsModal })
  toggleCreateList = () => this.setState({ createListModal: !this.state.createListModal })
  toggleDelete = id => {
    sessionStorage['deleteID'] = id
    this.setState({ deleteModal: !this.state.deleteModal })
  }

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

  // delete a favorite
  handleDelete = () => {
    let spotID = sessionStorage['deleteID']
    API.deleteFav(spotID).then(() => {
      this.toggleDelete()
      API.getFavs().then(res => {
        this.setState({ favs: res.data })
      })
    })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  createList = event => {
    event.preventDefault()
    let newList = this.state.newList
    API.createCustomList(newList)
      .then(res => console.log(res))
      .catch(err => console.log(err.response.data.msg))
  }

  render() {
    return (
      <div className="container">

        <Navbar />
        <h1 style={{ fontFamily: 'Lobster, cursive', color: '#fff', display: 'inline-block' }}>My Spots</h1>
        <button className="btn btn-primary pull-right" onClick={this.toggleCreateList}>Create New List</button>
        <h2 className="text-light mt-5">Favorites</h2>
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
                    handleDelete={() => this.toggleDelete(spot._id)}
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

        <CreateListModal
          isOpen={this.state.createListModal}
          toggle={this.toggleCreateList}
          createList={this.createList}
          handleInputChange={this.handleInputChange}
          newList={this.state.newList}
        />

        <DeleteModal
          isOpen={this.state.deleteModal}
          toggle={this.toggleDelete}
          handleDelete={this.handleDelete}
        />

      </div>
    )
  }
}

export default Profile