import React, { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

export default function Dashboard() {
  const location =useLocation()
  const [tab,setTab] =useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl =urlParams.get("tab")

  },[location.search])
  return (
    <div>
      {/* Sidebar */}
      <div className=''>

      </div>
    </div>
  )
}
