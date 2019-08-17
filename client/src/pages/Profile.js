import React from 'react'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import SearchResults from '../components/SearchResults'

class Profile extends React.Component {

  state = {
    favs: []
  }
  
  componentDidMount() {
    API.getFavs().then(res => {
      this.setState({ favs: res.data }, () => console.log(this.state.favs))
    })
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
                  <SearchResults 
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
                  />
                </div>
              )
            })
          ) : ''
        }
      </div>
    )
  }
}

export default Profile