import React from 'react'

export function Heading({ level, children, className = '' }) {
  const Tag = `h${level}`
  const sizeClasses = {
    1: 'text-4xl lg:text-5xl',
    2: 'text-2xl md:text-3xl lg:text-4xl',
    3: 'text-xl font-bold',
    4: 'text-lg font-bold',
    5: 'text-base font-bold',
    6: 'text-sm font-bold',
  }

  return (
    <Tag
      className={`font-heading font-bold text-surface-900 ${sizeClasses[level]} ${className}`}
    >
      {children}
    </Tag>
  )
}