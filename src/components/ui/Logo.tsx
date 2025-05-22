import type { ComponentProps } from 'react'

export function Logo({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      className={`text-blue-600 dark:text-blue-400 ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M60 120C93.137 120 120 93.137 120 60C120 26.863 93.137 0 60 0C26.863 0 0 26.863 0 60C0 93.137 26.863 120 60 120Z" 
        fill="currentColor"
      />
      <path
        d="M75 40H45C41.6863 40 39 42.6863 39 46V74C39 77.3137 41.6863 80 45 80H75C78.3137 80 81 77.3137 81 74V46C81 42.6863 78.3137 40 75 40Z"
        fill="white"
      />
      <path
        d="M60 65L65 70H55L60 65ZM55 50H65V60H55V50Z"
        fill="currentColor"
      />
    </svg>
  )
}