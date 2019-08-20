import React from 'react'

function SignupForm(props) {
  return (
    <div className="container">

      <h1 className="text-center text-light">Signup</h1>

      <form onSubmit={props.handleSubmit}>
        
        {/* name */}
        <div className="form-group">
        <label className="text-light">Name</label>
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
        <label className="text-light">Email address</label>
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
        <label className="text-light">Password</label>
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