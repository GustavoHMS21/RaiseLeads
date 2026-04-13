import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400">
        {icon}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>
      {action}
    </div>
  )
}

export { EmptyState }
