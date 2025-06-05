import React from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function TabButton({ tab, activeTab, setActiveTab }) {
  return (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 ${
        activeTab === tab.id
          ? 'text-primary bg-primary/10'
          : 'text-surface-500 hover:text-surface-700'
      }`}
    >
      <Icon name={tab.icon} className="w-5 h-5" />
      <span className="text-xs font-medium">{tab.label}</span>
    </button>
  )
}