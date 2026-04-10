import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-sans font-medium tracking-widest uppercase text-xs',
  'transition-all duration-300',
  'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ')

const variants: Record<Variant, string> = {
  primary: 'bg-[#C9A96E] text-white hover:bg-[#A8843E] border border-[#C9A96E] hover:border-[#A8843E]',
  outline: 'bg-transparent text-[#C9A96E] border border-[#C9A96E] hover:bg-[#C9A96E] hover:text-white',
  ghost:   'bg-transparent text-[#2A2A2A] hover:text-[#C9A96E] border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-8 py-3',
  lg: 'px-10 py-4 text-sm',
}

export function Button({
  variant = 'primary',
  size    = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
