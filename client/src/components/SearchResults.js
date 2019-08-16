import React from 'react'

function SearchResults(props) {
  return (
    <div>

      {/* Result card */}
      <div className="card mb-3" style={{ maxWidth: "100%" }} id={props.id} data-id={props.id} onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={props.image} className="card-img" alt="result" style={{ width: "100%", height: "18em", objectFit: 'cover' }} />
          </div>
          <div className="col-md-8" style={{ lineHeight: '0.75em', fontSize: '1em' }}>
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text"><small>{props.location}</small></p>
              <p className="card-text"><small>{props.phone}</small></p>
              <p className="card-text">{props.cat}</p>
              <p className="card-text">{props.price}</p>
              <p className="card-text">Rating: {props.rating} / 5</p>
              <p className="card-text">Reviews: {props.review_count}</p>
              <div>
                <button className="btn btn-outline-primary m-1" style={{ display: 'inline-block' }} onClick={props.reviews}>Reviews</button>
                <button className="btn btn-outline-success m-1" onClick={props.handleDirections}>Get Directions</button>
                <button className="btn btn-outline-warning m-1" onClick={props.handleFav}>&#9733; Add</button>
                <a href={props.url} target="_blank" rel="noopener noreferrer" className="ml-1 mt-3 text-dark" style={{ display: 'inline-block' }}>More Info</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SearchResults