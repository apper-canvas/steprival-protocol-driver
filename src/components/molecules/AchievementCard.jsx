import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

export function AchievementCard({ achievement, index }) {
  const isUnlocked = !!achievement.unlockedDate

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl p-4 shadow-card border-2 transition-all duration-300 hover:scale-105 ${
        isUnlocked ? 'border-primary' : 'border-surface-200 opacity-60'
      }`}
    >
      <div className="text-center">
        <div
          className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
            isUnlocked ? 'bg-gradient-to-br from-primary to-accent' : 'bg-surface-200'
          }`}
        >
          <Icon
            name={achievement.icon || 'Award'}
            className={`w-6 h-6 ${isUnlocked ? 'text-white' : 'text-surface-400'}`}
          />
        </div>
        <Heading
          level={3}
          className={`text-sm mb-1 ${isUnlocked ? 'text-surface-900' : 'text-surface-400'}`}
        >
          {achievement.name || 'Achievement'}
        </Heading>
        <Text
          variant="caption"
          className={`${isUnlocked ? 'text-surface-600' : 'text-surface-400'}`}
        >
          {achievement.description || 'Complete this challenge'}
        </Text>
        {isUnlocked && (
          <Text variant="success" className="mt-2 text-xs">
            Unlocked!
          </Text>
        )}
      </div>
    </motion.div>
  )
}