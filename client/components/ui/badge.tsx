import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[#4a7c59] to-[#5a9d6e] text-white shadow hover:from-[#3d6a4a] hover:to-[#4a7c59]",
        secondary:
          "border-transparent bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] text-[#2d5016] border-[#a5d6a7]",
        destructive:
          "border-transparent bg-gradient-to-r from-[#c17767] to-[#d48777] text-white shadow",
        outline:
          "border-[#d4c4a8] text-[#2d5016] hover:bg-[#f5f1e8]",
        organic:
          "border-transparent bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] text-[#2d5016] border-[#a5d6a7]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }