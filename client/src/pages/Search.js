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
    modal: false,
    price: 0,
    sort_by: 'best_match',
    categories: [],
    category: ''
  }

  // open or close modal
  toggle = () => this.setState({ modal: !this.state.modal })

  componentDidMount() {
    API.search('breakfast', 'orlando', 0, 'best_match')
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
      let { term, location, offset, sort_by } = this.state
      API.search(term, location, offset, sort_by)
        .then(res => {
          console.log(res.data.businesses)
          this.setState({ 
            results: res.data.businesses,
            search: true 
          }, () => this.getCats())
        })
    })
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
          API.search(this.state.term, this.state.location, this.state.offset, this.state.sort_by)
            .then(res => {
              console.log(res.data.businesses)
              this.setState({ results: res.data.businesses })
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
          this.toggle()
        })
      })
      .catch(err => console.log(err))
  }

  handleFilter = event => {
    let filter = event.target.getAttribute('data-filter')
    let val = event.target.getAttribute('data-val')
    this.setState({ [filter]: val }, () => {
      console.log('price: ' + this.state.price)
      console.log('sort_by: ' + this.state.sort_by)
      console.log('category: ' + this.state.category)
      
      // search based on new filters 
      if (filter === 'sort_by') {
        let { term, location, offset, sort_by } = this.state
        API.search(term, location, offset, sort_by)
          .then(res => {
            console.log(res.data.businesses)
            this.setState({ 
              results: res.data.businesses,
              search: true 
            })
          })
      } else if (filter === 'price') {
        let { term, location, offset, sort_by, price } = this.state
        API.filterPrice(term, location, offset, sort_by, price)
          .then(res => {
            console.log(res.data.businesses)
            this.setState({ 
              results: res.data.businesses,
              search: true 
            })
          })
      } else {
        let { term, location, offset, sort_by, category } = this.state
        console.log(this.state)
        API.filterCategory(term, location, offset, sort_by, category)
          .then(res => {
            console.log(res.data.businesses)
            this.setState({ 
              results: res.data.businesses,
              search: true 
            })
          })
      }
    })
  }

  // get categories for dropdown filter
  getCats = () => {
    let cats = []
    for (let i = 0; i < this.state.results.length; i++) {
      if (!cats.includes(this.state.results[i].categories[0].title) && cats.length < 7)
      cats.push(this.state.results[i].categories[0].title)
    }

    this.setState({ categories: cats }, () => console.log(this.state.categories))
    console.log(this.state)
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
          isOpen={this.state.modal}
          toggle={this.toggle}
          body={
            this.state.reviews.length ? this.state.reviews.map(review => <p className="mb-5">{review}</p>) : ''
          }
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
                        reviews={() => this.handleReviews(spot.url)}
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