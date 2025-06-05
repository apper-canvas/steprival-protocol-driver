import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { userService, dailyStatsService } from '../services'

function MainFeature({ user: initialUser, todayStats: initialStats }) {
  const [user, setUser] = useState(initialUser || {})
  const [todayStats, setTodayStats] = useState(initialStats || {})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const [isSimulating, setIsSimulating] = useState(false)

  // Calculate progress percentage
  const progressPercentage = Math.min(100, ((todayStats?.steps || 0) / (user?.dailyGoal || 10000)) * 100)
  const circumference = 2 * Math.PI * 80 // radius of 80
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  // Simulate adding steps (for demo purposes)
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
        activeMinutes: Math.floor(((todayStats?.steps || 0) + additionalSteps) / 100)
      }
      
      await dailyStatsService.update(1, updatedStats)
      setTodayStats(updatedStats)
      
      toast.success(`Great job! +${additionalSteps} steps added!`, {
        icon: "🚶‍♂️"
      })
    } catch (err) {
      toast.error("Failed to update steps. Please try again.")
    } finally {
      setIsSimulating(false)
    }
  }

  // Update daily goal
  const updateGoal = async () => {
    if (!newGoal || newGoal < 1000) {
      toast.error("Goal must be at least 1,000 steps")
      return
    }

    setLoading(true)
    try {
      const updatedUser = { ...user, dailyGoal: parseInt(newGoal) }
      await userService.update(user.id || 1, updatedUser)
      setUser(updatedUser)
      setShowGoalModal(false)
      setNewGoal('')
      toast.success("Daily goal updated successfully!")
    } catch (err) {
      toast.error("Failed to update goal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Check for goal achievement
  useEffect(() => {
    if (todayStats?.steps >= user?.dailyGoal && todayStats.steps > 0 && user.dailyGoal > 0) {
      toast.success("🎉 Congratulations! You've reached your daily goal!", {
        autoClose: 5000
      })
    }
  }, [todayStats?.steps, user?.dailyGoal])

  return (
    <div className="space-y-6 md:space-y-8 md:ml-44">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-surface-900 mb-2">
          Hello, {user?.name || "Walker"}! 👋
        </h2>
        <p className="text-surface-600 text-lg">
          Ready to crush your step goal today?
        </p>
      </motion.div>

      {/* Main Step Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-card border border-surface-100 p-6 md:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Progress Ring */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <svg className="w-full h-full progress-ring" viewBox="0 0 180 180">
                {/* Background circle */}
                <circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="90"
                  cy="90"
                  r="80"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="progress-ring__circle"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D084" />
                    <stop offset="100%" stopColor="#4ECDC4" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  key={todayStats?.steps || 0}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-surface-900 mb-2">
                    {(todayStats?.steps || 0).toLocaleString()}
                  </div>
                  <div className="text-surface-500 font-medium">steps today</div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mt-2">
                    {Math.round(progressPercentage)}%
                  </div>
                </motion.div>
              </div>

              {/* Goal achievement animation */}
              <AnimatePresence>
                {progressPercentage >= 100 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ApperIcon name="Trophy" className="w-8 h-8 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex-1 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-4 text-center">
                <ApperIcon name="Target" className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-surface-900">
                  {(user?.dailyGoal || 10000).toLocaleString()}
                </div>
                <div className="text-surface-600 text-sm">Daily Goal</div>
              </div>
              
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 text-center">
                <ApperIcon name="Flame" className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-surface-900">
                  {user?.streak || 0}
                </div>
                <div className="text-surface-600 text-sm">Day Streak</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <ApperIcon name="MapPin" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {(todayStats?.distance || 0).toFixed(1)} km
                  </span>
                </div>
                <div className="text-surface-500 text-sm">Distance</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <ApperIcon name="Zap" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {todayStats?.calories || 0}
                  </span>
                </div>
                <div className="text-surface-500 text-sm">Calories</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <ApperIcon name="Clock" className="w-4 h-4 text-surface-500" />
                  <span className="text-lg font-bold text-surface-900">
                    {todayStats?.activeMinutes || 0}m
                  </span>
                </div>
                <div className="text-surface-500 text-sm">Active</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={simulateSteps}
                disabled={isSimulating}
                className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isSimulating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Steps...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Steps</span>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => setShowGoalModal(true)}
                className="flex-1 bg-white border-2 border-primary text-primary px-6 py-4 rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="Settings" className="w-4 h-4" />
                  <span>Set Goal</span>
                </div>
              </button>
            </div>

            {/* Progress Message */}
            <div className="text-center bg-surface-50 rounded-xl p-4">
              {progressPercentage >= 100 ? (
                <div className="text-primary font-medium">
                  🎉 Amazing! You've crushed your goal today!
                </div>
              ) : progressPercentage >= 75 ? (
                <div className="text-accent font-medium">
                  🔥 You're so close! Just {((user?.dailyGoal || 10000) - (todayStats?.steps || 0)).toLocaleString()} more steps!
                </div>
              ) : progressPercentage >= 50 ? (
                <div className="text-yellow-600 font-medium">
                  💪 Great progress! You're halfway there!
                </div>
              ) : (
                <div className="text-surface-600 font-medium">
                  🚀 Let's get moving! Every step counts!
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Goal Setting Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Target" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-2">Set Your Daily Goal</h3>
                <p className="text-surface-600">Choose a step goal that challenges you!</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Daily Step Goal
                  </label>
                  <input
                    type="number"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder={`Current: ${(user?.dailyGoal || 10000).toLocaleString()}`}
                    className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1000"
                    step="500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[5000, 8000, 10000, 12000, 15000, 20000].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setNewGoal(goal.toString())}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        newGoal === goal.toString()
                          ? 'bg-primary text-white'
                          : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                      }`}
                    >
                      {goal.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowGoalModal(false)}
                    className="flex-1 px-4 py-3 bg-surface-200 text-surface-700 rounded-xl font-medium hover:bg-surface-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateGoal}
                    disabled={loading || !newGoal}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Set Goal'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature