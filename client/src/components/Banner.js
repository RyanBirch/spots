import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
      <h2 className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
      <div className="text-center m-5">  
        <button className="btn btn-warning m-3"><Link to="/search" style={{ textDecoration: 'none', color: 'black' }}>Search</Link></button>
        <button className="btn btn-warning m-3">Discover</button>
      </div>
    </div>
  )
}

export default Banner