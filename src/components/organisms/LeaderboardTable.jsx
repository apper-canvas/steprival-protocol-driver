import React from 'react'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { LeaderboardEntry } from '@/components/molecules/LeaderboardEntry'

export function LeaderboardTable({ user, todayStats }) {
  const friendsData = [
    { name: user?.name || 'You', steps: todayStats?.steps || 0, rank: 1, isCurrentUser: true },
    { name: 'Sarah M.', steps: 12847, rank: 2 },
    { name: 'Mike R.', steps: 11203, rank: 3 },
    { name: 'Emma L.', steps: 9876, rank: 4 },
    { name: 'John D.', steps: 8945, rank: 5 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Heading level={2}>Leaderboard</Heading>
        <Button variant="secondary" icon={Icon} iconName="UserPlus">
          Invite Friends
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-surface-100">
          <Heading level={4} className="mb-2">
            Today's Rankings
          </Heading>
          <Text>See how you stack up against your friends</Text>
        </div>

        <div className="divide-y divide-surface-100">
          {friendsData.map((friend, index) => (
            <LeaderboardEntry key={index} friend={friend} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}