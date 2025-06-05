import React from 'react'
import { motion } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Avatar } from '@/components/atoms/Avatar'

export function ChallengeCard({ challenge, userSteps, index }) {
  const progressPercentage = Math.min(
    100,
    ((userSteps || 0) / (challenge.goal || 10000)) * 100
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-surface-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <Heading level={4} className="mb-2">
            {challenge.type || 'Daily Steps Challenge'}
          </Heading>
          <Text className="mb-3">
            Goal: {challenge.goal?.toLocaleString() || '10,000'} steps
          </Text>
          <div className="flex items-center space-x-2 mb-3">
            {challenge.participants?.slice(0, 3).map((participant, i) => (
              <Avatar key={i} char={participant?.name?.[0] || 'U'} size="sm" />
            ))}
            {challenge.participants?.length > 3 && (
              <Avatar
                char={`+${challenge.participants.length - 3}`}
                className="bg-surface-200 text-surface-600"
                size="sm"
              />
            )}
          </div>
          <ProgressBar percentage={progressPercentage} />
        </div>
        <div className="text-center sm:text-right">
          <div className="text-2xl font-bold text-primary mb-1">
            {Math.round(progressPercentage)}%
          </div>
          <Text variant="subtle">Complete</Text>
        </div>
      </div>
    </motion.div>
  )
}