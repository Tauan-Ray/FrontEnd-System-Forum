import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-blue bg-white px-4 py-3 text-base text-gray-dark placeholder-gray-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-blue-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}



export { Input }
