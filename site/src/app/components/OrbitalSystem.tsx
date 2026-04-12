import { memo, type CSSProperties } from 'react'

type OrbitParticle = {
  duration: string
  delay: string
  radius: number
  opacity: number
}

type OrbitLayer = {
  id: string
  size: string
  duration: string
  delay: string
  angle: number
  tiltX: number
  tiltY: number
  depth: number
  opacity: number
  rx: number
  ry: number
  strokeWidth: number
  particles: OrbitParticle[]
}

// Static geometry keeps React out of the animation loop.
const orbitLayers: OrbitLayer[] = [
  {
    id: 'inner',
    size: 'clamp(360px, 48vw, 620px)',
    duration: '28s',
    delay: '-6s',
    angle: 18,
    tiltX: 74,
    tiltY: -8,
    depth: 30,
    opacity: 0.95,
    rx: 360,
    ry: 170,
    strokeWidth: 1.55,
    particles: [
      { duration: '18s', delay: '-4s', radius: 3.9, opacity: 0.95 },
      { duration: '26s', delay: '-13s', radius: 2.8, opacity: 0.5 },
    ],
  },
  {
    id: 'middle',
    size: 'clamp(460px, 62vw, 820px)',
    duration: '38s',
    delay: '-18s',
    angle: -32,
    tiltX: 71,
    tiltY: 12,
    depth: 0,
    opacity: 0.78,
    rx: 420,
    ry: 230,
    strokeWidth: 1.35,
    particles: [
      { duration: '24s', delay: '-9s', radius: 3.5, opacity: 0.76 },
      { duration: '34s', delay: '-18s', radius: 2.7, opacity: 0.44 },
    ],
  },
  {
    id: 'outer',
    size: 'clamp(560px, 76vw, 980px)',
    duration: '48s',
    delay: '-10s',
    angle: 54,
    tiltX: 78,
    tiltY: -18,
    depth: -35,
    opacity: 0.6,
    rx: 450,
    ry: 155,
    strokeWidth: 1.24,
    particles: [
      { duration: '30s', delay: '-6s', radius: 3.1, opacity: 0.68 },
      { duration: '39s', delay: '-22s', radius: 2.4, opacity: 0.36 },
    ],
  },
  {
    id: 'halo',
    size: 'clamp(620px, 88vw, 1120px)',
    duration: '62s',
    delay: '-24s',
    angle: -14,
    tiltX: 64,
    tiltY: 10,
    depth: -70,
    opacity: 0.38,
    rx: 470,
    ry: 285,
    strokeWidth: 1.12,
    particles: [{ duration: '46s', delay: '-16s', radius: 2.5, opacity: 0.32 }],
  },
]

function getEllipsePath(rx: number, ry: number) {
  return `M ${500 - rx},500 a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 -${rx * 2},0`
}

export const OrbitalSystem = memo(function OrbitalSystem() {
  return (
    <div
      aria-hidden="true"
      className="orbital-system absolute inset-0 z-[1] overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,242,74,0.18)_0%,rgba(200,242,74,0.08)_18%,rgba(246,244,236,0)_54%)]" />

      <div className="absolute top-1/2 left-1/2 h-[clamp(180px,22vw,280px)] w-[clamp(180px,22vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8faa22]/18 orbital-core" />

      {orbitLayers.map((orbit) => {
        const orbitPath = getEllipsePath(orbit.rx, orbit.ry)

        const shellStyle: CSSProperties = {
          width: orbit.size,
          height: orbit.size,
          opacity: orbit.opacity,
        }

        const planeStyle: CSSProperties = {
          transform: `translateZ(${orbit.depth}px) rotateZ(${orbit.angle}deg) rotateX(${orbit.tiltX}deg) rotateY(${orbit.tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }

        const rotatorStyle: CSSProperties = {
          animationDuration: orbit.duration,
          animationDelay: orbit.delay,
        }

        return (
          <div
            key={orbit.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={shellStyle}
          >
            <div className="h-full w-full" style={planeStyle}>
              {/* SVG preserves a true ellipse while CSS handles the linear rotation. */}
              <div className="orbital-rotator h-full w-full" style={rotatorStyle}>
                <svg
                  viewBox="0 0 1000 1000"
                  className="orbital-svg h-full w-full overflow-visible"
                >
                  <path
                    d={orbitPath}
                    fill="none"
                    stroke="rgba(143, 170, 34, 0.12)"
                    strokeWidth={orbit.strokeWidth * 5.5}
                  />
                  <path
                    d={orbitPath}
                    fill="none"
                    stroke="rgba(135, 158, 52, 0.55)"
                    strokeWidth={orbit.strokeWidth}
                    vectorEffect="non-scaling-stroke"
                  />

                  {orbit.particles.map((particle, index) => {
                    return (
                      <circle
                        key={`${orbit.id}-${index}`}
                        className="orbital-particle"
                        cx="0"
                        cy="0"
                        r={particle.radius}
                        fill={`rgba(160, 186, 70, ${particle.opacity})`}
                      >
                        <animateMotion
                          dur={particle.duration}
                          begin={particle.delay}
                          repeatCount="indefinite"
                          rotate="auto"
                          calcMode="linear"
                          path={orbitPath}
                        />
                      </circle>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
})
