import React, { useState, useEffect } from 'react'
import { userService } from '@/services'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { MainDashboard } from '@/components/organisms/MainDashboard'

function HomePage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('home')

  // This useEffect will fetch the user data once to pass to the DashboardHeader
  // The MainDashboard component will handle its own data fetching for its content based on activeTab
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getById(1)
        setUser(userData || {})
      } catch (err) {
        console.error('Failed to fetch user:', err)
        // Handle error, e.g., show a toast notification
      }
    }
    fetchUser()
  }, [])

  return (
    <DashboardLayout user={user} activeTab={activeTab} setActiveTab={setActiveTab}>
      <MainDashboard activeTab={activeTab} />
    </DashboardLayout>
  )
}

export default HomePage