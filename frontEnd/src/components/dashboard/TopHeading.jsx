import React from 'react'

function TopHeading({title}) {
  return (
    <header className="bg-accent text-primary py-4 px-6 rounded-lg shadow mb-6">
          <h1 className="text-xl font-bold">{title}</h1>
        </header>
  )
}

export default TopHeading
