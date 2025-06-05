import React from 'react'

export function ProgressBar({ percentage, className = '' }) {
  return (
    <div className={`w-full bg-surface-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, percentage)}%` }}
      ></div>
    </div>
  )
}