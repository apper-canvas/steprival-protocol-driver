import React from 'react'
import { TabButton } from '@/components/molecules/TabButton'

export function MobileNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Home' },
    { id: 'challenges', icon: 'Target', label: 'Challenges' },
    { id: 'friends', icon: 'Users', label: 'Friends' },
    { id: 'profile', icon: 'Award', label: 'Achievements' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 glass border-t border-surface-200 md:hidden">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
    </nav>
  )
}