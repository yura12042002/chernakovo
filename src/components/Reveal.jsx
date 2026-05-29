import { motion } from 'framer-motion';

const variants = {
  up:    { hidden: { opacity: 0, y: 48 },  show: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -48 }, show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 60 },  show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({ children, dir = 'up', delay = 0, className = '', as = 'div', once = true }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants[dir]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// Контейнер с поэтапным появлением детей
export function Stagger({ children, className = '', stagger = 0.12, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', dir = 'up' }) {
  return (
    <motion.div
      className={className}
      variants={variants[dir]}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
