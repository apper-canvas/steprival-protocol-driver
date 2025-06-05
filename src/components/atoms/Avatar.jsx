import React from 'react'

export function Avatar({ char, className = '', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  return (
    <div
      className={`bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium ${sizeClasses[size]} ${className}`}
    >
      {char}
    </div>
  )
}