import React from 'react'

function SearchResults(props) {
  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "100%" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={props.image} className="card-img" alt="..." style={{ width: "100%", height: "20em", objectFit: 'cover' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">{props.location}</p>
              <p className="card-text">{props.phone}</p>
              <p className="card-text">{props.cat}</p>
              <p className="card-text">{props.price}</p>
              <p className="card-text">Rating: {props.rating} / 5</p>
              <p className="card-text">Reviews: {props.review_count}</p>
              <p className="card-text"><a href={props.url} target="_blank" rel="noopener noreferrer">{props.name}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults