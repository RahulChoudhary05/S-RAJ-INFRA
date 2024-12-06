import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedBibliography.css";
import logo from "../../assets/Logo/logo.svg"

const Bibliography = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bibliography-container">
      <motion.img
        src={logo}
        alt="Sathyendra Singh"
        className="profile-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h2
        className="name font-playfair font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Sathyendra Singh
      </motion.h2>
      <motion.h3
        className="position font-playfair font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Managing Director
      </motion.h3>
      <motion.p
        className="description font-mono font-medium highlight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="highlight font-playfair italic font-medium text-xl">
          We can see the progress of a successful company but the struggle
          behind the establishment of the firm remains unnoticed.
        </span>
      </motion.p>
      <motion.div
        className="short-bio font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>
          Life is not easy for human beings, so does with him. He spent his
          young age in Bihar with highly educated and established family of
          himself. But, the wealth of his close relatives in Bengal attracts his
          soul. Despite completing his study, he came to Kolkata and started
          working under his relative. After gaining 4 years of experience, he
          had taken the vision to start own initiative.
        </p>
        <p>
          The road is not so easy. He had seen couple of failures in developing
          a running business. But, failure can be overcome with strong
          determination and patience.
        </p>
        <p>
          Our CEO has taken the failure as Learnings. He know how to fight back.
          In the market, he had developed strong connections which assists him
          to start new construction venture that serves Railways. The company
          has seen multiple achievements with his clear and strong vision.
        </p>
      </motion.div>
      <motion.button
        className="read-more-btn font-inter font-semibold"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="full-bio font-mono bio"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="bio font-playfair font-bold text-3xl">Biography</h3>
            <p>
              This is the story of a common man achieving and conquering big
              goals by his will power and overcoming all hurdles slowly but
              steadily which might be a motivational story of many others. The
              moral of the story is never doubt in your capabilities and give up
              hope in fear of failure but to achieve your goal with continuous
              effort until it is achieved and there after make a bigger goal to
              achieve which becomes a instances and motivation to many others.
            </p>
            <p>
              We can see the progress of a successful company but the struggle
              behind the establishment of the firm remains unnoticed. Life is
              not easy for human beings, so does with him. He spent his young
              age in Bihar with highly educated and established family of
              himself. But, the wealth of his close relatives in Bengal
              attracted his soul. Despite completing his study, he came to
              Kolkata and started working in the business firm of close his
              relative. After gaining 4 years of experience, he had taken the
              vision to start own initiative.
            </p>
            <p>
              But, the road is not so easy. He had seen couple of failures in
              developing a running business. But, failure can be overcome with
              strong determination and patience. Our CEO has taken the failure
              as Learnings. He knows how to fight back. In the market, he had
              developed strong connections which assisted him to start new
              construction venture that serves Railways. The company has seen
              multiple achievements with his clear and strong vision.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bibliography;
