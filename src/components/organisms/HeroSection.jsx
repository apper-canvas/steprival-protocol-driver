import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { userService, dailyStatsService } from '@/services'
import { UserGreeting } from '@/components/molecules/UserGreeting'
import { ProgressRing } from '@/components/atoms/ProgressRing'
import { MetricCard } from '@/components/molecules/MetricCard'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { GoalSettingModal } from '@/components/organisms/GoalSettingModal'

export function HeroSection({ user: initialUser, todayStats: initialStats }) {
  const [user, setUser] = useState(initialUser || {})
  const [todayStats, setTodayStats] = useState(initialStats || {})
  const [loading, setLoading] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const [isSimulating, setIsSimulating] = useState(false)

  const progressPercentage = Math.min(
    100,
    ((todayStats?.steps || 0) / (user?.dailyGoal || 10000)) * 100
  )

  const simulateSteps = async () => {
    if (isSimulating) return

    setIsSimulating(true)
    const additionalSteps = Math.floor(Math.random() * 500) + 100

    try {
      const updatedStats = {
        ...todayStats,
        steps: (todayStats?.steps || 0) + additionalSteps,
        distance: ((todayStats?.steps || 0) + additionalSteps) * 0.0008, // Rough km conversion
        calories: Math.floor(((todayStats?.steps || 0) + additionalSteps) * 0.04),
        activeMinutes: Math.floor(((todayStats?.steps || 0) + additionalSteps) / 100),
      }

      await dailyStatsService.update(1, updatedStats)
      setTodayStats(updatedStats)

      toast.success(`Great job! +${additionalSteps} steps added!`, {
        icon: '🚶‍♂️',
      })
    } catch (err) {
      toast.error('Failed to update steps. Please try again.')
    } finally {
      setIsSimulating(false)
    }
  }

  const updateGoal = async () => {
    if (!newGoal || parseInt(newGoal) < 1000) {
      toast.error('Goal must be at least 1,000 steps')
      return
    }

    setLoading(true)
    try {
      const updatedUser = { ...user, dailyGoal: parseInt(newGoal) }
      await userService.update(user.id || 1, updatedUser)
      setUser(updatedUser)
      setShowGoalModal(false)
      setNewGoal('')
      toast.success('Daily goal updated successfully!')
    } catch (err) {
      toast.error('Failed to update goal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (todayStats?.steps >= user?.dailyGoal && todayStats.steps > 0 && user.dailyGoal > 0) {
      toast.success("🎉 Congratulations! You've reached your daily goal!", {
        autoClose: 5000,
      })
    }
  }, [todayStats?.steps, user?.dailyGoal])

  const getProgressMessage = () => {
    if (progressPercentage >= 100) {
      return (
        <Text variant="success">🎉 Amazing! You've crushed your goal today!</Text>
      )
    } else if (progressPercentage >= 75) {
      const remainingSteps =
        (user?.dailyGoal || 10000) - (todayStats?.steps || 0)
      return (
        <Text variant="warning">
          🔥 You're so close! Just {remainingSteps.toLocaleString()} more steps!
        </Text>
      )
    } else if (progressPercentage >= 50) {
      return (
        <Text variant="info">💪 Great progress! You're halfway there!</Text>
      )
    } else {
      return (
        <Text>
          🚀 Let's get moving! Every step counts!
        </Text>
      )
    }
  }

  return (
    <div className="space-y-6 md:space-y-8 md:ml-44">
      <UserGreeting userName={user?.name} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-card border border-surface-100 p-6 md:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <ProgressRing
              percentage={progressPercentage}
              value={todayStats?.steps || 0}
              label="steps today"
              goal={user?.dailyGoal || 10000}
            />
            <AnimatePresence>
              {progressPercentage >= 100 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <Icon name="Trophy" className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                iconName="Target"
                value={(user?.dailyGoal || 10000).toLocaleString()}
                label="Daily Goal"
                className="bg-gradient-to-br from-primary/10 to-primary/5"
                iconColorClass="text-primary"
              />
              <MetricCard
                iconName="Flame"
                value={user?.streak || 0}
                label="Day Streak"
                className="bg-gradient-to-br from-accent/10 to-accent/5"
                iconColorClass="text-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="MapPin" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {(todayStats?.distance || 0).toFixed(1)} km
                  </span>
                </div>
                <Text variant="subtle">Distance</Text>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="Zap" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {todayStats?.calories || 0}
                  </span>
                </div>
                <Text variant="subtle">Calories</Text>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="Clock" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {todayStats?.activeMinutes || 0}m
                  </span>
                </div>
                <Text variant="subtle">Active</Text>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={simulateSteps}
                isLoading={isSimulating}
                icon={Icon}
                iconName="Plus"
                className="flex-1"
              >
                Add Steps
              </Button>

              <Button
                onClick={() => setShowGoalModal(true)}
                variant="outline"
                icon={Icon}
                iconName="Settings"
                className="flex-1"
              >
                Set Goal
              </Button>
            </div>

            <div className="text-center bg-surface-50 rounded-xl p-4">
              {getProgressMessage()}
            </div>
          </div>
        </div>
      </motion.div>

      <GoalSettingModal
        showGoalModal={showGoalModal}
        setShowGoalModal={setShowGoalModal}
        newGoal={newGoal}
        setNewGoal={setNewGoal}
        updateGoal={updateGoal}
        loading={loading}
        userDailyGoal={user?.dailyGoal || 10000}
      />
    </div>
  )
}