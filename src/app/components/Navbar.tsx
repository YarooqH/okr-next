import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Navbar() {
  return (
    <header className='p-1 w-full relative'>
        <div className='m-2 right-0'>
            <UserButton  afterSignOutUrl='/' />
        </div>
    </header>
  )
}

export default Navbar