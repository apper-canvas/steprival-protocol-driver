import React from 'react'
import { motion } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

export function UserGreeting({ userName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center md:text-left"
    >
      <Heading level={2} className="mb-2">
        Hello, {userName || 'Walker'}! 👋
      </Heading>
      <Text className="text-lg">Ready to crush your step goal today?</Text>
    </motion.div>
  )
}