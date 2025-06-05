import React from 'react'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { ChallengeCard } from '@/components/molecules/ChallengeCard'

export function ChallengeList({ challenges, todayStats }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Heading level={2}>Active Challenges</Heading>
        <Button icon={Icon} iconName="Plus">
          New Challenge
        </Button>
      </div>
      <div className="grid gap-4 md:gap-6">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            userSteps={todayStats?.steps}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}