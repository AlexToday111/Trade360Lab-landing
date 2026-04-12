import { Github, Info } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { AboutProjectModal } from './AboutProjectModal'
import { OrbitalSystem } from './OrbitalSystem'

type HomeLandingProps = {
  isLightTheme: boolean
  repositoryUrl: string
}

const stats = [
  { value: `360${'\u00B0'}`, label: 'Research Loop' },
  { value: '24/7', label: 'Market Monitoring' },
  { value: '\u221E', label: 'Optimization Paths' },
]

const lightTheme = {
  ambient: 'bg-[radial-gradient(circle_at_top,rgba(200,242,74,0.24)_0%,rgba(200,242,74,0)_38%),radial-gradient(circle_at_85%_18%,rgba(243,180,108,0.16)_0%,rgba(243,180,108,0)_28%)]',
  container: 'bg-[#f6f4ec] text-[#182016]',
  corner: 'border-[#c8d59f]/70',
  footer: 'text-[#748063]',
  ghostPrimaryOpacity: 'opacity-[0.08]',
  ghostPrimaryStroke: '2px rgba(32, 37, 30, 0.12)',
  ghostSecondaryOpacity: 'opacity-[0.05]',
  ghostSecondaryStroke: '2px rgba(143, 170, 34, 0.14)',
  gridOpacity: 'opacity-60',
  gridPattern:
    'linear-gradient(rgba(37, 46, 32, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 46, 32, 0.05) 1px, transparent 1px)',
  primaryButton:
    'bg-[#20251e] text-white shadow-[0_14px_28px_rgba(31,39,29,0.16)]',
  primaryButtonGlow: 'group-hover:opacity-30',
  secondaryButton:
    'border-[#bfc9ac] bg-white/70 text-[#2d3527] shadow-[0_10px_24px_rgba(31,39,29,0.08)] hover:border-[#9bb43d] hover:bg-[#f1f5e5]',
  statLabel: 'text-[#67705d]',
  statValue: 'text-[#8faa22]',
  subtitle: 'text-[#2d3527]/85',
  subtitleShadow: '0 0 10px rgba(143,170,34,0.16)',
  titleGlow: 'opacity-35 blur-3xl',
  titleLab: 'text-[#8faa22] drop-shadow-[0_12px_28px_rgba(143,170,34,0.18)]',
  titleLine: 'via-[#9bb43d]/45',
  titleMain: 'text-[#1f271d] drop-shadow-[0_14px_24px_rgba(31,39,29,0.08)]',
}

const darkTheme = {
  ambient: 'bg-[radial-gradient(circle_at_top,rgba(200,242,74,0.12)_0%,rgba(200,242,74,0)_32%),radial-gradient(circle_at_20%_80%,rgba(0,255,136,0.08)_0%,rgba(0,255,136,0)_28%)]',
  container: 'bg-[#0a0a0a] text-white',
  corner: 'border-[#c8f24a]/20',
  footer: 'text-[#c8f24a]/40',
  ghostPrimaryOpacity: 'opacity-[0.03]',
  ghostPrimaryStroke: '2px rgba(200, 242, 74, 0.3)',
  ghostSecondaryOpacity: 'opacity-[0.02]',
  ghostSecondaryStroke: '2px rgba(200, 242, 74, 0.2)',
  gridOpacity: 'opacity-20',
  gridPattern:
    'linear-gradient(rgba(200, 242, 74, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 242, 74, 0.1) 1px, transparent 1px)',
  primaryButton: 'bg-[#c8f24a] text-black',
  primaryButtonGlow: 'group-hover:opacity-50',
  secondaryButton:
    'border-[#c8f24a]/50 bg-transparent text-[#c8f24a] hover:border-[#c8f24a] hover:bg-[#c8f24a]/10',
  statLabel: 'text-gray-400',
  statValue: 'text-[#c8f24a]',
  subtitle: 'text-white/90',
  subtitleShadow: '0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,255,136,0.3)',
  titleGlow: 'opacity-30 blur-2xl',
  titleLab: 'text-[#c8f24a]/80 drop-shadow-[0_0_15px_rgba(200,242,74,0.2)]',
  titleLine: 'via-[#c8f24a]/40',
  titleMain: 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]',
}

export function HomeLanding({ isLightTheme, repositoryUrl }: HomeLandingProps) {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const theme = isLightTheme ? lightTheme : darkTheme

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${theme.container}`}>
      <div
        className={`absolute inset-0 ${theme.gridOpacity}`}
        style={{
          backgroundImage: theme.gridPattern,
          backgroundSize: '50px 50px',
        }}
      />

      <div className={`absolute inset-0 ${theme.ambient}`} />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className={`absolute text-[20vw] font-bold whitespace-nowrap ${theme.ghostPrimaryOpacity}`}
          style={{
            color: 'transparent',
            fontFamily: 'Sora, sans-serif',
            WebkitTextStroke: theme.ghostPrimaryStroke,
          }}
        >
          T360 LAB
        </div>
        <div
          className={`absolute top-[20%] text-[20vw] font-bold whitespace-nowrap ${theme.ghostSecondaryOpacity}`}
          style={{
            color: 'transparent',
            fontFamily: 'Sora, sans-serif',
            WebkitTextStroke: theme.ghostSecondaryStroke,
          }}
        >
          T360 LAB
        </div>
      </div>

      <OrbitalSystem isLightTheme={isLightTheme} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <motion.div
            className={`absolute inset-0 bg-[#c8f24a] ${theme.titleGlow}`}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative">
            <h1 className="relative flex items-baseline justify-center text-center text-[4.9rem] font-black tracking-tight md:text-[8.5rem]">
              <span className={theme.titleMain}>
                T360
              </span>
              <span className={`-ml-[0.04em] -translate-y-1 text-[3.3rem] font-bold md:-ml-[0.05em] md:-translate-y-0 md:text-[4.8rem] ${theme.titleLab}`}>
                LAB
              </span>
            </h1>

            <motion.div
              className={`-mt-6 h-[2px] bg-gradient-to-r from-transparent ${theme.titleLine} to-transparent`}
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
          className={`mb-20 max-w-2xl text-center text-xl font-medium uppercase tracking-[0.28em] md:text-[1.4rem] ${theme.subtitle}`}
          style={{
            textShadow: theme.subtitleShadow,
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
            className={`group relative overflow-hidden rounded-lg px-8 py-4 font-semibold transition-all duration-300 ${theme.primaryButton}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 bg-[#c8f24a] opacity-0 blur-xl transition-opacity duration-300 ${theme.primaryButtonGlow}`} />
            <div className="relative flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span>View Repository</span>
            </div>
          </motion.a>

          <motion.button
            type="button"
            onClick={() => setIsAboutModalOpen(true)}
            className={`group relative overflow-hidden rounded-lg border-2 px-8 py-4 font-semibold transition-all duration-300 ${theme.secondaryButton}`}
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
              <div className={`text-3xl font-bold md:text-4xl ${theme.statValue}`}>{stat.value}</div>
              <div className={`mt-1 text-xs md:text-sm ${theme.statLabel}`}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest md:text-xs ${theme.footer}`}>
        STRATEGY RESEARCH / BACKTESTING / OPTIMIZATION
      </div>

      <div className={`absolute top-0 left-0 h-32 w-32 border-l-2 border-t-2 ${theme.corner}`} />
      <div className={`absolute top-0 right-0 h-32 w-32 border-r-2 border-t-2 ${theme.corner}`} />
      <div className={`absolute bottom-0 left-0 h-32 w-32 border-l-2 border-b-2 ${theme.corner}`} />
      <div className={`absolute right-0 bottom-0 h-32 w-32 border-r-2 border-b-2 ${theme.corner}`} />

      <AboutProjectModal
        isLightTheme={isLightTheme}
        open={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  )
}
