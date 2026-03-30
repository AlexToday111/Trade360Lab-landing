import { Github, Info } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { AboutProjectModal } from './components/AboutProjectModal'
import { OrbitalSystem } from './components/OrbitalSystem'

const repositoryUrl =
  import.meta.env.VITE_REPOSITORY_URL ?? 'https://github.com/AlexToday111/TradeLab'

const stats = [
  { value: `360${'\u00B0'}`, label: 'Research Loop' },
  { value: '24/7', label: 'Market Monitoring' },
  { value: '\u221E', label: 'Optimization Paths' },
]

export default function App() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200, 242, 74, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 242, 74, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="absolute text-[20vw] font-bold opacity-[0.03] whitespace-nowrap"
          style={{
            color: 'transparent',
            fontFamily: 'Sora, sans-serif',
            WebkitTextStroke: '2px rgba(200, 242, 74, 0.3)',
          }}
        >
          T360 LAB
        </div>
        <div
          className="absolute top-[20%] text-[20vw] font-bold opacity-[0.02] whitespace-nowrap"
          style={{
            color: 'transparent',
            fontFamily: 'Sora, sans-serif',
            WebkitTextStroke: '2px rgba(200, 242, 74, 0.2)',
          }}
        >
          T360 LAB
        </div>
      </div>

      <OrbitalSystem />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <motion.div
            className="absolute inset-0 bg-[#c8f24a] opacity-30 blur-2xl"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative">
            <h1
              className="relative flex items-baseline justify-center text-center text-[4.9rem] font-black tracking-tight md:text-[8.5rem]"
            >
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">T360</span>
              <span className="-ml-[0.04em] -translate-y-1 text-[3.3rem] font-bold text-[#c8f24a]/80 drop-shadow-[0_0_15px_rgba(200,242,74,0.2)] md:-ml-[0.05em] md:-translate-y-0 md:text-[4.8rem]">
                LAB
              </span>
            </h1>

            <motion.div
              className="-mt-6 h-[2px] bg-gradient-to-r from-transparent via-[#c8f24a]/40 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20 max-w-2xl text-center text-xl font-medium uppercase tracking-[0.28em] text-white/90 md:text-[1.4rem]"
          style={{
            textShadow:
              '0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)',
          }}
        >
          Build. Test. Explore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg bg-[#c8f24a] px-8 py-4 font-semibold text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-[#c8f24a] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
            <div className="relative flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span>View Repository</span>
            </div>
          </motion.a>

          <motion.button
            type="button"
            onClick={() => setIsAboutModalOpen(true)}
            className="group relative overflow-hidden rounded-lg border-2 border-[#c8f24a]/50 bg-transparent px-8 py-4 font-semibold text-[#c8f24a] transition-all duration-300 hover:border-[#c8f24a] hover:bg-[#c8f24a]/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex items-center gap-2">
              About Project
              <Info className="h-5 w-5" />
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold text-[#c8f24a] md:text-4xl"
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-xs text-gray-400 md:text-sm"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-[#c8f24a]/40 md:text-xs">
        STRATEGY RESEARCH / BACKTESTING / OPTIMIZATION
      </div>

      <div className="absolute top-0 left-0 h-32 w-32 border-l-2 border-t-2 border-[#c8f24a]/20" />
      <div className="absolute top-0 right-0 h-32 w-32 border-r-2 border-t-2 border-[#c8f24a]/20" />
      <div className="absolute bottom-0 left-0 h-32 w-32 border-l-2 border-b-2 border-[#c8f24a]/20" />
      <div className="absolute right-0 bottom-0 h-32 w-32 border-r-2 border-b-2 border-[#c8f24a]/20" />

      <AboutProjectModal
        open={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
    
  )
}
