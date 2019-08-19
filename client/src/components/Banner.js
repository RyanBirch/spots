import React from 'react'
import { Redirect } from 'react-router-dom'

class Banner extends React.Component {

  state = {
    redirectToSearch: false,
    what: '',
    where: ''
  }

  handleChange = event => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    let what = document.getElementById('what')
    let where = document.getElementById('where')
    sessionStorage['what'] = what.value
    sessionStorage['where'] = where.value
    this.setState({ redirectToSearch: true })
  }

  render() {

    if (this.state.redirectToSearch) return <Redirect to="/search" />

    return (
      <div>
        {/* <h2 className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
        <div className="text-center m-5">  
          <Link to="/search" style={{ textDecoration: 'none', color: 'black' }}><button className="btn btn-warning m-3">Search</button></Link>
          <button className="btn btn-warning m-3">Discover</button>
        </div> */}
  
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              Search for
              <input id="what" type="text" className="form-control" placeholder="Restaurants, bars, events, etc." style={{ width: '75%', display: 'inline-block' }} onChange={this.handleChange} name="what" value={this.state.what} />
            </div>
            <div className="col">
              Near
              <input id="where" type="text" className="form-control" placeholder="" style={{ width: '75%', display: 'inline-block' }} onChange={this.handleChange} name="where" value={this.state.where} />
              <button type="submit" className="btn btn-primary">Go!</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Banner