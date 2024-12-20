import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center gap-8 p-4"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold font-playfair mb-3">Welcome to S Raj Infra Projects</h2>
        <p className="text-richblack-900 font-mono">
          We are dedicated to providing world-class engineering solutions, innovating and constructing bridges and other engineering marvels using cutting-edge technology and cost-efficient practices.
        </p>
      </div>
    </motion.div>
  )
}

