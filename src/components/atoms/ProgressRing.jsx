import React from 'react'
import { motion } from 'framer-motion'

export function ProgressRing({ percentage, value, label, goal }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <svg className="w-full h-full progress-ring" viewBox="0 0 180 180">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#f1f5f9"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
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
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-heading font-bold text-surface-900 mb-2">
            {value.toLocaleString()}
          </div>
          <div className="text-surface-500 font-medium">{label}</div>
          <div className="text-2xl md:text-3xl font-bold text-primary mt-2">
            {Math.round(percentage)}%
          </div>
        </motion.div>
      </div>
    </div>
  )
}