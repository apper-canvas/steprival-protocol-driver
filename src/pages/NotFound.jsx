import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-white to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <ApperIcon name="MapPin" className="w-12 h-12 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-7xl font-heading font-bold text-surface-200 mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-surface-900 mb-4"
        >
          Looks like you've wandered off the path!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-surface-600 mb-8 leading-relaxed"
        >
          Don't worry, even the best walkers take wrong turns sometimes. Let's get you back to tracking those steps!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-surface-500">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Activity" className="w-4 h-4 text-primary" />
              <span>Keep Moving</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Target" className="w-4 h-4 text-accent" />
              <span>Stay Motivated</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound