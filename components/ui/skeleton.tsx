import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        cn(`
          flex
          flex-col
          relative
          overflow-hidden
          rounded-xl
          bg-[#f5f6f7]
          border
          p-4
          before:absolute
          before:inset-0
          before:-translate-x-full
          before:-skew-x-12
          before:animate-[shimmer_1.6s_infinite]
          before:border-t
        before:border-dark/5
          before:bg-gradient-to-r
          before:from-transparent
          before:via-[#f0f0f0]
          before:to-transparent
        `,
        className
        )
      }
      {...props}
    />
  )
}

export { Skeleton }
