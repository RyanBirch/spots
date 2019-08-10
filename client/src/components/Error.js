import React from 'react'

function Error(props) {
  return (
    <div>
      <h3 className="text-center text-danger">{props.message}</h3>
    </div>
  )
}

export default Error 