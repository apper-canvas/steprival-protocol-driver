import React from 'react'
import { NavItem } from '@/components/molecules/NavItem'

export function DesktopNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Dashboard' },
    { id: 'challenges', icon: 'Target', label: 'Challenges' },
    { id: 'friends', icon: 'Users', label: 'Leaderboard' },
    { id: 'profile', icon: 'Award', label: 'Achievements' },
  ]

  return (
    <nav className="hidden md:block fixed top-20 left-6 bg-white/90 glass rounded-2xl shadow-soft border border-surface-200 p-2">
      <div className="flex flex-col space-y-2">
        {tabs.map((tab) => (
          <NavItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>
    </nav>
  )
}