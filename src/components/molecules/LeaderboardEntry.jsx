import React from 'react'
import { motion } from 'framer-motion'
import { Avatar } from '@/components/atoms/Avatar'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

export function LeaderboardEntry({ friend, index }) {
  const rankClasses = {
    1: 'bg-yellow-100 text-yellow-700',
    2: 'bg-gray-100 text-gray-700',
    3: 'bg-orange-100 text-orange-700',
  }

  const iconName =
    friend.rank === 1 ? 'Crown' : friend.rank === 2 ? 'Medal' : 'Award'
  const iconColorClass =
    friend.rank === 1
      ? 'text-yellow-500'
      : friend.rank === 2
      ? 'text-gray-500'
      : 'text-orange-500'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 flex items-center justify-between hover:bg-surface-50 transition-colors ${
        friend.isCurrentUser ? 'bg-primary/5' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            rankClasses[friend.rank] || 'bg-surface-100 text-surface-600'
          }`}
        >
          {friend.rank}
        </div>
        <Avatar char={friend.name[0]} />
        <div>
          <div
            className={`font-medium ${
              friend.isCurrentUser ? 'text-primary font-bold' : 'text-surface-900'
            }`}
          >
            {friend.name} {friend.isCurrentUser && '(You)'}
          </div>
          <Text variant="subtle">{friend.steps.toLocaleString()} steps</Text>
        </div>
      </div>

      {friend.rank <= 3 && (
        <Icon name={iconName} className={`w-5 h-5 ${iconColorClass}`} />
      )}
    </motion.div>
  )
}