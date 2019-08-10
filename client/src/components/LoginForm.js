import React from 'react'

function LoginForm(props) {
  return (
    <div className="container">

      <h1 className="text-center">Log in</h1>

      <form onSubmit={props.handleSubmit}>

        {/* email */}
        <div className="form-group">
          Email address
          <input 
            type="email" 
            className="form-control" 
            name="email"
            value={props.email}
            onChange={props.handleInputChange}
          />
        </div>

        {/* password */}
        <div className="form-group">
          Password
          <input 
            type="password" 
            className="form-control" 
            name="password"
            value={props.password}
            onChange={props.handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>

    </div> 
  )
}

export default LoginForm