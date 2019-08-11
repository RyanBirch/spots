import React from 'react'

function SearchForm(props) {
  return (
    <div>

      <form onSubmit={props.handleSubmit}>

        {/* search term */}
        <div className="form-group">
          Term
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

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>

    </div>
  )
} 

export default SearchForm