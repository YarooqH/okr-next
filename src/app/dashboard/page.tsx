'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/nextjs'

function Index() {
  const {user} = useUser()

  console.log("userrrr", user)

  return (
    <div>
      <Navbar />
      <h2>Dasboaard</h2>
    </div>
  )
}

export default Index