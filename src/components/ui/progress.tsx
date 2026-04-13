import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  color?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, color = "bg-blue-600", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
        {...props}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
