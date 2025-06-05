import React from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function MetricCard({ iconName, value, label, className = '' }) {
  return (
    <div
      className={`rounded-2xl p-4 text-center ${className}`}
    >
      <Icon name={iconName} className="w-6 h-6 mx-auto mb-2" />
      <div className="text-2xl font-bold text-surface-900">{value}</div>
      <Text variant="subtle">{label}</Text>
    </div>
  )
}