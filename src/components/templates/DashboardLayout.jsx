import React from 'react'
import { DashboardHeader } from '@/components/organisms/DashboardHeader'
import { MobileNavigation } from '@/components/organisms/MobileNavigation'
import { DesktopNavigation } from '@/components/organisms/DesktopNavigation'

export function DashboardLayout({ user, activeTab, setActiveTab, children }) {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <DashboardHeader user={user} />
      {children}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <DesktopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}