// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className=' py-[215.5px]'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>Oopsie!</h1>
            <p className='text-xl font-semibold mt-2'>Page Not Found</p>
            <div className="mt-3">
                <Link to="/" className='border-b-2'>Visit Our Webpage</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound
