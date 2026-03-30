import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

type AboutProjectModalProps = {
  open: boolean
  onClose: () => void
}

const sections = [
  {
    title: 'Назначение',
    content:
      'Этот проект предназначен для исследования стратегий, бэктестинга и оптимизации торговых систем.',
  },
  {
    title: 'Видение',
    content:
      'В дальнейшем проект может вырасти в полноценную исследовательскую платформу для алгоритмической торговли с более глубокими инструментами для итераций, исполнения и количественного анализа.',
  },
]

const techStack = [
  { label: 'Frontend', value: 'React (Vite)' },
  { label: 'Backend', value: 'Java + Python' },
  { label: 'Data', value: 'Пайплайны рыночных данных / API' },
]

const features = [
  'Бэктестинг стратегий',
  'Импорт и обработка данных',
  'Модульная архитектура (Java API + Python engine)',
  'Локальная среда выполнения',
]

export function AboutProjectModal({ open, onClose }: AboutProjectModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const { body } = document
    const previousOverflow = body.style.overflow

    body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="about-project-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <motion.button
            type="button"
            aria-label="Закрыть модальное окно о проекте"
            className="absolute inset-0 bg-[rgba(3,8,6,0.78)] backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-project-title"
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#c8f24a]/18 bg-[linear-gradient(180deg,rgba(18,20,12,0.92)_0%,rgba(9,10,7,0.95)_100%)] shadow-[0_0_40px_rgba(200,242,74,0.08),0_24px_72px_rgba(0,0,0,0.62)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#c8f24a]/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(200,242,74,0.16)_0%,rgba(200,242,74,0)_72%)]" />

            <div className="scrollbar-hidden relative max-h-[min(80vh,760px)] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="mb-8 flex items-start justify-between gap-6">
                <div className="max-w-xl">
                  <h2
                    id="about-project-title"
                    className="mb-3 text-3xl font-black tracking-tight text-[#c8f24a]/80 sm:text-4xl"
                  >
                    О проекте Trade360Lab
                  </h2>
                  <p
                    className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]"
                  >
                    Сфокусированная продуктовая среда для исследовательских процессов в
                    трейдинге с премиальным локальным опытом исполнения.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Закрыть модальное окно"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-[#c8f24a]/35 hover:bg-[#c8f24a]/10 hover:text-[#eef8af]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h3
                      className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[#c8f24a]/80"
                    >
                      {section.title}
                    </h3>
                    <p
                      className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]"
                    >
                      {section.content}
                    </p>
                  </section>
                ))}

                <section>
                  <h3
                    className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-[#c8f24a]/80"
                  >
                    Технологии
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {techStack.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      >
                        <p
                          className="text-[11px] uppercase tracking-[0.24em] text-slate-500"
                        >
                          {item.label}
                        </p>
                        <p
                          className="mt-2 text-sm font-medium text-slate-100"
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3
                    className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-[#c8f24a]/80"
                  >
                    Возможности
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-2xl border border-[#c8f24a]/12 bg-[#c8f24a]/[0.035] px-4 py-4 text-sm text-slate-200"
                      >
                        <div className="mb-3 h-px w-12 bg-gradient-to-r from-[#c8f24a]/70 to-transparent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
