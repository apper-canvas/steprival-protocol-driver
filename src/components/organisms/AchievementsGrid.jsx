import React from 'react'
import { Heading } from '@/components/atoms/Heading'
import { AchievementCard } from '@/components/molecules/AchievementCard'

export function AchievementsGrid({ achievements }) {
  return (
    <div className="space-y-6">
      <Heading level={2}>Your Achievements</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}