import React from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function StatBadge({ icon, value, label, iconColorClass = 'text-primary' }) {
  return (
    <div className="hidden sm:flex items-center space-x-2 bg-surface-100 rounded-xl px-3 py-2">
      <Icon name={icon} className={`w-4 h-4 ${iconColorClass}`} />
      <Text className="text-sm font-medium text-surface-700">
        {value} {label}
      </Text>
    </div>
  )
}