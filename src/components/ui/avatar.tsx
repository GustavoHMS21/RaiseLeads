import * as React from "react"
import { cn, getInitials } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, src, size = "md", ...props }, ref) => {
    if (src) {
      return (
        <img
          src={src}
          alt={name}
          className={cn(
            "rounded-full object-cover",
            sizeClasses[size],
            className
          )}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {getInitials(name)}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
