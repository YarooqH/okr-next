'use client'
import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/nextjs'
import { prisma } from '@/db'
import axios from 'axios'

function Index() {
  const {user} = useUser()

  // console.log("userrrr", user)
  

  // useEffect(() => {
  //   (async () => {
  //     let res = await axios.post('/api/user', {
  //       email: user?.primaryEmailAddress?.emailAddress,
  //       name: user?.username
  //     })

  //     console.log("response", res)
  //   })()
  // }, [user])
  useEffect(() => {
    (async () => {
      let res = await axios.get('/api/user')

      console.log("response", res)
    })()
  }, [user])


  return (
    <div>
      <Navbar />
      <h2>Dasboaard</h2>
    </div>
  )
}

export default Index