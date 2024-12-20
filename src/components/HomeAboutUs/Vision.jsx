import { motion } from 'framer-motion'

export default function Vision() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row-reverse items-center gap-8 p-4"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To innovate and construct world-class bridges and engineering marvels using cutting-edge technology and cost-efficient practices.</li>
          <li>To become a leader in construction engineering.</li>
          <li>To remain a profitable, creative, and compliant leader in the industry.</li>
          <li>To ensure care and concern for all stakeholders.</li>
        </ul>
      </div>
    </motion.div>
  )
}

