import React from 'react'
import { motion } from 'framer-motion'

export function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  icon: IconComponent,
  isLoading = false,
  ...props
}) {
  const baseClasses =
    'px-6 py-3 rounded-xl font-medium transition-all duration-300'
  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg transform hover:scale-105',
    secondary:
      'bg-gradient-to-r from-accent to-primary text-white hover:shadow-lg transform hover:scale-105',
    outline:
      'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transform hover:scale-105',
    ghost:
      'bg-transparent text-surface-600 hover:text-surface-900 hover:bg-surface-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    cancel:
      'bg-surface-200 text-surface-700 hover:bg-surface-300 transition-colors',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed transform-none' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          {IconComponent && <IconComponent className="w-4 h-4" />}
          <span>{children}</span>
        </div>
      )}
    </motion.button>
  )
}