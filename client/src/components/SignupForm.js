import React from 'react'

function SignupForm(props) {
  return (
    <div className="container">

      <h1 className="text-center">Signup</h1>

      <form onSubmit={props.handleSubmit}>
        
        {/* name */}
        <div className="form-group">
          Name
          <input 
            type="text" 
            className="form-control" 
            name="name"
            value={props.name}
            onChange={props.handleInputChange}
          />
        </div>

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

export default SignupForm