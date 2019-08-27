import React from 'react'
import API from '../utils/API'
import FavResults from '../components/FavResults'
import ReviewsModal from '../components/ReviewsModal'
import DirectionsModal from '../components/DirectionsModal'
import maps from '../utils/maps'
import DeleteModal from '../components/DeleteModal'
import Navbar from '../components/Navbar'
import CreateListModal from '../components/CreateListModal'
import DeleteListModal from '../components/DeleteListModal'

class Profile extends React.Component {

  state = {
    favs: [],
    reviews: [],
    reviewsModal: false,
    directionsModal: false,
    deleteModal: false,
    createListModal: false,
    deleteListModal: false,
    newList: '',
    lists: []
  }
  
  // get favorites from database when page loads
  componentDidMount() {
    API.getFavs().then(res => {
      this.setState({ favs: res.data }, () => {
        API.getCustomLists().then(res => {
          console.log(res.data)
          this.setState({ lists: res.data })
        })
      })
    })
  }

  // open or close modals
  toggleReviews = () => this.setState({ reviewsModal: !this.state.reviewsModal })
  toggleDirections = () => this.setState({ directionsModal: !this.state.directionsModal })
  toggleCreateList = () => this.setState({ createListModal: !this.state.createListModal })

  // opens modal to delete favorites and passes information to session storage
  toggleDelete = (id, listType, listItemName, itemID) => {
    if (listType === 'custom') {
      sessionStorage['listType'] = 'custom'
      sessionStorage['listItemName'] = listItemName
      sessionStorage['itemID'] = itemID
    } else {
      sessionStorage['listType'] = 'fav'
    }
    sessionStorage['deleteID'] = id
    this.setState({ deleteModal: !this.state.deleteModal })
  }

  // opens modal to delete lists and passes information to session storage
  toggleDeleteList = id => {
    sessionStorage['listID'] = id
    this.setState({ deleteListModal: !this.state.deleteListModal })
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
    if (sessionStorage['listType'] === 'fav') {
      // delete from favorites list
      API.deleteFav(spotID).then(() => {
        this.toggleDelete()
        API.getFavs().then(res => {
          this.setState({ favs: res.data })
        })
      })
    } else {
      // delete from custom list
      let listItemName = sessionStorage['listItemName']
      let itemID = sessionStorage['itemID']
      API.deleteFromCustomList(listItemName, itemID).then(res => {
        this.toggleDelete()
        console.log(res)
        API.getCustomLists().then(res => {
          console.log(res.data)
          this.setState({ lists: res.data })
        })
      })
    }
  }

  // delete a custom list
  handleDeleteList = () => {
    let listID = sessionStorage['listID']
    API.deleteList(listID).then(res => {
      this.toggleDeleteList()
      API.getCustomLists().then(res => {
        this.setState({ lists: res.data })
      })
    })
  }

  handleInputChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  // create a custom list
  createList = event => {
    event.preventDefault()
    let newList = this.state.newList
    API.createCustomList(newList)
      .then(res => {
        console.log(res)
        this.toggleCreateList()
        API.getCustomLists().then(res => {
          console.log(res.data)
          this.setState({ lists: res.data })
        })
      })
      .catch(err => console.log(err.response.data.msg))
  }

  render() {
    return (
      <div className="container">

        <Navbar />
        <h1 style={{ fontFamily: 'Lobster, cursive', color: '#fff', display: 'inline-block' }}>My Spots</h1>
        <button className="btn btn-primary pull-right" onClick={this.toggleCreateList}>Create New List</button>

        {/* render favorite list */}
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
                    handleDelete={() => this.toggleDelete(spot._id, 'fav')}
                  />
                </div>
              )
            })
          ) : ''
        }

        {/* render custom lists */}
        {
          this.state.lists.length ? (
            this.state.lists.map(listItem => {
              return (
                <div key={listItem._id} className="mt-5">
                  <h2 className="text-light d-inline-block">{listItem.name}</h2>
                  <button className="btn btn-danger m-3" onClick={() => this.toggleDeleteList(listItem._id)}>Delete List</button>
                  {
                    listItem.list.length ? (
                      listItem.list.map(item => {
                        return (
                          <div key={item._id}>
                            <FavResults 
                              id={item._id}
                              image={item.image}
                              name={item.name}
                              location={item.address}
                              phone={item.phone}
                              cat={item.category}
                              price={item.price}
                              rating={item.rating}
                              review_count={item.reviewCount}
                              url={item.url}
                              reviews={() => this.handleReviews(item.url)}
                              handleDirections={() => this.handleDirections(item.address, item.coordinates)}
                              handleDelete={() => this.toggleDelete(item._id, 'custom', listItem.name, item._id)}
                            />
                          </div>
                        )
                      })
                    ) : ''
                  }
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

        <DeleteListModal
          isOpen={this.state.deleteListModal}
          toggle={this.toggleDeleteList}
          handleDelete={this.handleDeleteList}
        />

      </div>
    )
  }
}

export default Profile