import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { MyAwesomeThemeComponent } from '../page'

function Navbar() {
  return (
    <header className='flex p-1 w-full'>
      <div className='w-[98%]'>
      </div>
        <div className='p-1 flex gap-5'>
            <MyAwesomeThemeComponent />
            <UserButton  afterSignOutUrl='/'/>
        </div>
    </header>
  )
}

export default Navbar