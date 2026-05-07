import React from 'react'

const Student = ({ name, sub,marks }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Subject: {sub}</p>
      <p>Marks: {marks}</p>
    </div>
  )
}

export default Student
