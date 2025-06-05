import React from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function NavItem({ tab, isActive, onClick, isMobile = false }) {
  const commonClasses = 'transition-all duration-200'
  const activeClasses = 'text-primary bg-primary/10 shadow-sm'
  const inactiveClasses =
    'text-surface-500 hover:text-surface-700 hover:bg-surface-50'

  return (
    <button
      key={tab.id}
      onClick={() => onClick(tab.id)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${commonClasses} ${
        isActive ? activeClasses : inactiveClasses
      } ${isMobile ? 'flex-col justify-center w-full' : 'min-w-[140px]'}`}
    >
      <Icon name={tab.icon} className="w-5 h-5" />
      <Text className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
        {tab.label}
      </Text>
    </button>
  )
}