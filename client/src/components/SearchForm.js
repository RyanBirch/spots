import React from 'react'

function SearchForm(props) {
  return (
    <div>

      <form onSubmit={props.handleSubmit} className="mb-3">

        {/* search term */}
        <div className="form-group">
          Find a spot
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for bars, restaurants, events, etc" 
            name="term"
            value={props.term}
            onChange={props.handleInputChange}
          />
        </div>

        {/* location */}
        <div className="form-group">
          Location
          <input 
            type="text" 
            className="form-control" 
            name="location"
            value={props.location}
            onChange={props.handleInputChange}
          />
        </div>

        {/* price filter */}
        <button type="button" className="btn btn-light" data-val="1" data-filter="price" onClick={props.handleFilter}>$</button>
        <button type="button" className="btn btn-light" data-val="2" data-filter="price" onClick={props.handleFilter}>$$</button>
        <button type="button" className="btn btn-light" data-val="3" data-filter="price" onClick={props.handleFilter}>$$$</button>
        <button type="button" className="btn btn-light" data-val="4" data-filter="price" onClick={props.handleFilter}>$$$$</button>

        {/* sort by */}
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort By
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button type="button" className="dropdown-item" data-val="best_match" data-filter="sort_by" onClick={props.handleFilter}>Best Match</button>
            <button type="button" className="dropdown-item" data-val="rating" data-filter="sort_by" onClick={props.handleFilter}>Rating</button>
            <button type="button" className="dropdown-item" data-val="review_count" data-filter="sort_by" onClick={props.handleFilter}>Review Count</button>
            <button type="button" className="dropdown-item" data-val="distance" data-filter="sort_by" onClick={props.handleFilter}>Distance</button>
          </div>
        </div>

        {/* categories */}
        {/* <div className="dropdown" style={{ display: 'inlineBlock' }}>
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            
          </div>
        </div> */}

        {/* submit */}
        <button type="submit" className="btn btn-primary" style={{ width: '8em', display: 'block' }}>Go!</button>

      </form>

    </div>
  )
} 

export default SearchForm