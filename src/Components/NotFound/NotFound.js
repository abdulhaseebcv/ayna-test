import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundStyle.js'
import { ErrorContainer } from './NotFoundStyle.js'

const NotFound = () => {
  return (
  <ErrorContainer>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
  </ErrorContainer>
  )
}

export default NotFound