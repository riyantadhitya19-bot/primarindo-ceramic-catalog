import { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99]
    }
  }
}

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const fadeIn: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
}

export const slideIn: Variants = {
  initial: {
    x: -20,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.99]
    }
  }
}