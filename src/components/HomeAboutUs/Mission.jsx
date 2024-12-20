import { motion } from 'framer-motion'

export default function Mission() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center gap-8 p-4"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To be a premier engineering organization, delivering signature bridges and engineering marvels both domestically and internationally.</li>
          <li>To foster innovation and create value.</li>
          <li>To set global benchmarks while ensuring total customer satisfaction.</li>
          <li>To achieve continuous growth through skill enhancement.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Investor Corner</h3>
        <p className="text-gray-700">
          We utilize the most modern construction equipment and technology, with a high degree of expertise and substantial in-house resources. Our team comprises 50 permanent staff members, and we engage more than 150 locally employed staff and workers at various project sites at any given time.
        </p>
      </div>
    </motion.div>
  )
}

