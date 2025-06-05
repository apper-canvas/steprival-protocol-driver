import React from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { StatBadge } from '@/components/molecules/StatBadge'
import { Avatar } from '@/components/atoms/Avatar'

export function DashboardHeader({ user }) {
  return (
    <header className="bg-white/80 glass border-b border-surface-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Icon name="Activity" className="w-6 h-6 text-white" />
            </div>
            <div>
              <Heading level={3} className="text-xl">
                StepRival
              </Heading>
              <Text variant="subtle" className="hidden sm:block">
                Compete. Walk. Win.
              </Text>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <StatBadge
              icon="Flame"
              value={user?.streak || 0}
              label="day streak"
              iconColorClass="text-primary"
            />
            <Avatar char={user?.name?.[0] || 'U'} />
          </div>
        </div>
      </div>
    </header>
  )
}