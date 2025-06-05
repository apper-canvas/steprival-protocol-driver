import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

export function GoalSettingModal({
  showGoalModal,
  setShowGoalModal,
  newGoal,
  setNewGoal,
  updateGoal,
  loading,
  userDailyGoal,
}) {
  const goalPresets = [5000, 8000, 10000, 12000, 15000, 20000]

  return (
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
                <Icon name="Target" className="w-8 h-8 text-white" />
              </div>
              <Heading level={3} className="mb-2">
                Set Your Daily Goal
              </Heading>
              <Text>Choose a step goal that challenges you!</Text>
            </div>

            <div className="space-y-4">
              <Input
                label="Daily Step Goal"
                id="dailyGoal"
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder={`Current: ${userDailyGoal.toLocaleString()}`}
                min="1000"
                step="500"
              />

              <div className="grid grid-cols-3 gap-2">
                {goalPresets.map((goal) => (
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
                <Button
                  variant="cancel"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateGoal}
                  disabled={loading || !newGoal}
                  isLoading={loading}
                  className="flex-1"
                >
                  Set Goal
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}