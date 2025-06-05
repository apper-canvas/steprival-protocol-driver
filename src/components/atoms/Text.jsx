import React from 'react'

export function Text({ children, className = '', variant = 'body' }) {
  const variants = {
    body: 'text-surface-600',
    subtle: 'text-surface-500 text-sm',
    caption: 'text-xs',
    success: 'text-primary font-medium',
    warning: 'text-accent font-medium',
    info: 'text-yellow-600 font-medium',
  }

  return <p className={`${variants[variant]} ${className}`}>{children}</p>
}