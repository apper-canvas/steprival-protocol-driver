import React, { useState, useEffect } from 'react'
import { userService, dailyStatsService, challengeService, achievementService } from '@/services'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ChallengeList } from '@/components/organisms/ChallengeList'
import { LeaderboardTable } from '@/components/organisms/LeaderboardTable'
import { AchievementsGrid } from '@/components/organisms/AchievementsGrid'
import { Icon } from '@/components/atoms/Icon'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'

export function MainDashboard({ activeTab }) {
  const [user, setUser] = useState(null)
  const [todayStats, setTodayStats] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const [userData, statsData, challengeData, achievementData] =
          await Promise.all([
            userService.getById(1),
            dailyStatsService.getAll(),
            challengeService.getAll(),
            achievementService.getAll(),
          ])

        setUser(userData || {})
        setTodayStats(statsData?.[0] || {})
        setChallenges(challengeData || [])
        setAchievements(achievementData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Text className="font-medium">Loading your dashboard...</Text>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-md w-full">
          <Icon name="AlertTriangle" className="w-12 h-12 text-secondary mx-auto mb-4" />
          <Heading level={3} className="mb-2">
            Something went wrong
          </Heading>
          <Text className="mb-4">{error}</Text>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'challenges':
        return <ChallengeList challenges={challenges} todayStats={todayStats} />
      case 'friends':
        return <LeaderboardTable user={user} todayStats={todayStats} />
      case 'profile':
        return <AchievementsGrid achievements={achievements} />
      default:
        return <HeroSection user={user} todayStats={todayStats} />
    }
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {renderContent()}
    </main>
  )
}