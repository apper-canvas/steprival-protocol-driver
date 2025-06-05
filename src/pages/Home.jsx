import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'
import { userService } from '../services'
import { dailyStatsService } from '../services'
import { challengeService } from '../services'
import { achievementService } from '../services'

function Home() {
  const [user, setUser] = useState(null)
  const [todayStats, setTodayStats] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [achievements, setAchievements] = useState([])
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const [userData, statsData, challengeData, achievementData] = await Promise.all([
          userService.getById(1),
          dailyStatsService.getAll(),
          challengeService.getAll(),
          achievementService.getAll()
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
          <p className="text-surface-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-md w-full">
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-surface-900 mb-2">Something went wrong</h2>
          <p className="text-surface-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'challenges':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-surface-900">Active Challenges</h2>
              <button className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <ApperIcon name="Plus" className="w-4 h-4 inline mr-2" />
                New Challenge
              </button>
            </div>
            <div className="grid gap-4 md:gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card border border-surface-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-surface-900 mb-2">{challenge.type || "Daily Steps Challenge"}</h3>
                      <p className="text-surface-600 mb-3">Goal: {challenge.goal?.toLocaleString() || "10,000"} steps</p>
                      <div className="flex items-center space-x-2 mb-3">
                        {challenge.participants?.slice(0, 3).map((participant, i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {participant?.name?.[0] || "U"}
                          </div>
                        ))}
                        {challenge.participants?.length > 3 && (
                          <div className="w-8 h-8 bg-surface-200 rounded-full flex items-center justify-center text-surface-600 text-sm font-medium">
                            +{challenge.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="w-full bg-surface-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, ((todayStats?.steps || 0) / (challenge.goal || 10000)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {Math.round(((todayStats?.steps || 0) / (challenge.goal || 10000)) * 100)}%
                      </div>
                      <div className="text-sm text-surface-500">Complete</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      case 'friends':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-surface-900">Leaderboard</h2>
              <button className="bg-gradient-to-r from-accent to-primary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <ApperIcon name="UserPlus" className="w-4 h-4 inline mr-2" />
                Invite Friends
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-surface-100">
                <h3 className="font-bold text-lg text-surface-900 mb-2">Today's Rankings</h3>
                <p className="text-surface-600">See how you stack up against your friends</p>
              </div>
              
              <div className="divide-y divide-surface-100">
                {[
                  { name: user?.name || "You", steps: todayStats?.steps || 0, rank: 1, isCurrentUser: true },
                  { name: "Sarah M.", steps: 12847, rank: 2 },
                  { name: "Mike R.", steps: 11203, rank: 3 },
                  { name: "Emma L.", steps: 9876, rank: 4 },
                  { name: "John D.", steps: 8945, rank: 5 }
                ].map((friend, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 flex items-center justify-between hover:bg-surface-50 transition-colors ${
                      friend.isCurrentUser ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        friend.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        friend.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        friend.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-surface-100 text-surface-600'
                      }`}>
                        {friend.rank}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                        {friend.name[0]}
                      </div>
                      <div>
                        <div className={`font-medium ${friend.isCurrentUser ? 'text-primary font-bold' : 'text-surface-900'}`}>
                          {friend.name} {friend.isCurrentUser && '(You)'}
                        </div>
                        <div className="text-surface-500 text-sm">{friend.steps.toLocaleString()} steps</div>
                      </div>
                    </div>
                    
                    {friend.rank <= 3 && (
                      <ApperIcon 
                        name={friend.rank === 1 ? "Crown" : friend.rank === 2 ? "Medal" : "Award"} 
                        className={`w-5 h-5 ${
                          friend.rank === 1 ? 'text-yellow-500' :
                          friend.rank === 2 ? 'text-gray-500' :
                          'text-orange-500'
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-surface-900">Your Achievements</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-4 shadow-card border-2 transition-all duration-300 hover:scale-105 ${
                    achievement.unlockedDate ? 'border-primary' : 'border-surface-200 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      achievement.unlockedDate ? 'bg-gradient-to-br from-primary to-accent' : 'bg-surface-200'
                    }`}>
                      <ApperIcon 
                        name={achievement.icon || "Award"} 
                        className={`w-6 h-6 ${achievement.unlockedDate ? 'text-white' : 'text-surface-400'}`}
                      />
                    </div>
                    <h3 className={`font-bold text-sm mb-1 ${
                      achievement.unlockedDate ? 'text-surface-900' : 'text-surface-400'
                    }`}>
                      {achievement.name || "Achievement"}
                    </h3>
                    <p className={`text-xs ${
                      achievement.unlockedDate ? 'text-surface-600' : 'text-surface-400'
                    }`}>
                      {achievement.description || "Complete this challenge"}
                    </p>
                    {achievement.unlockedDate && (
                      <div className="mt-2 text-xs text-primary font-medium">
                        Unlocked!
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      
      default:
        return <MainFeature user={user} todayStats={todayStats} />
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white/80 glass border-b border-surface-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <ApperIcon name="Activity" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-surface-900">StepRival</h1>
                <p className="text-xs text-surface-500 hidden sm:block">Compete. Walk. Win.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-surface-100 rounded-xl px-3 py-2">
                <ApperIcon name="Flame" className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-surface-700">{user?.streak || 0} day streak</span>
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{user?.name?.[0] || "U"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 glass border-t border-surface-200 md:hidden">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: 'Home', label: 'Home' },
            { id: 'challenges', icon: 'Target', label: 'Challenges' },
            { id: 'friends', icon: 'Users', label: 'Friends' },
            { id: 'profile', icon: 'Award', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-primary bg-primary/10' 
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-20 left-6 bg-white/90 glass rounded-2xl shadow-soft border border-surface-200 p-2">
        <div className="flex flex-col space-y-2">
          {[
            { id: 'home', icon: 'Home', label: 'Dashboard' },
            { id: 'challenges', icon: 'Target', label: 'Challenges' },
            { id: 'friends', icon: 'Users', label: 'Leaderboard' },
            { id: 'profile', icon: 'Award', label: 'Achievements' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 min-w-[140px] ${
                activeTab === tab.id 
                  ? 'text-primary bg-primary/10 shadow-sm' 
                  : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Home