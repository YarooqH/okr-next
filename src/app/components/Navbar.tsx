import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Navbar() {
  return (
    <div className='p-3 w-full'>
        <div className='float-right'>
            <UserButton  />
        </div>
    </div>
  )
}

export default Navbar