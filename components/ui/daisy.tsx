export function Daisy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      <g fill="#fdf9f6" stroke="#e9c9c8" strokeWidth="1">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse
            key={deg}
            cx="30"
            cy="14"
            rx="6"
            ry="13"
            transform={`rotate(${deg} 30 30)`}
          />
        ))}
      </g>
      <circle cx="30" cy="30" r="7" fill="#d9a875" />
    </svg>
  )
}
