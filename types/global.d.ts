declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '@/components/*' {
  import { FC } from 'react'
  export const MainLayout: FC<{ children: React.ReactNode }>
}
