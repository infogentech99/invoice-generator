import React, { use, useEffect } from 'react'
import Dashboard from './Dashboard/Dashboard'
import { useNavigate } from 'react-router'


const BillInfo = () => {
  const Navigate = useNavigate()
  useEffect(() => {
    Navigate('/admin-dashboard');
  },[])
  return (
    <Dashboard/>
  )
}

export default BillInfo