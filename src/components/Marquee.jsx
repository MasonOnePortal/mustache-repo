const items = [
  'Precision',
  'Style',
  'Confidence',
  'Est. 2019',
  'Premium Grooming',
  'Master Barbers',
  'Mr. Mustache',
  'Your Signature Look',
]

export default function Marquee({ reverse = false, light = false }) {
  // Triple for seamless loop at any screen width
  const content = [...items, ...items, ...items]

  return (
    <div
      className={`overflow-hidden py-[18px] border-y ${
        light
          ? 'border-white/5 bg-charcoal'
          : 'border-white/6 bg-dark'
      }`}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `${reverse ? 'mq-rev' : 'mq-fwd'} 28s linear infinite`,
          willChange: 'transform',
        }}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-7 shrink-0 px-7"
          >
            <span
              className="text-[11px] tracking-[0.35em] uppercase font-semibold"
              style={{ color: light ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.22)' }}
            >
              {item}
            </span>
            <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '7px' }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes mq-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes mq-rev {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
