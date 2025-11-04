import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#4a7c59] to-[#5a9d6e] text-white hover:from-[#3d6a4a] hover:to-[#4a7c59] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus-visible:ring-[#4a7c59]/50",
        destructive:
          "bg-gradient-to-r from-[#c17767] to-[#d48777] text-white hover:from-[#b06858] hover:to-[#c17767] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        outline:
          "border-2 border-[#8b6f47] bg-transparent text-[#8b6f47] hover:bg-[#f5f1e8] hover:border-[#4a7c59] hover:text-[#4a7c59] shadow-sm",
        secondary:
          "bg-gradient-to-r from-[#87a96b] to-[#9bc280] text-white hover:from-[#75985a] hover:to-[#87a96b] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        ghost:
          "hover:bg-[#f5f1e8] hover:text-[#4a7c59] text-[#5a5a5a]",
        link: "text-[#4a7c59] underline-offset-4 hover:underline hover:text-[#2d5016]",
        organic: "bg-gradient-to-r from-[#4a7c59] via-[#5a9d6e] to-[#6ab882] text-white hover:from-[#3d6a4a] hover:via-[#4a7c59] hover:to-[#5a9d6e] shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-2xl px-8 py-4 font-semibold",
        "buy-now": "bg-gradient-to-r from-[#8b6f47] to-[#a68b5b] text-white hover:from-[#745a3a] hover:to-[#8b6f47] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-xl px-6 py-3 font-bold",
        earth: "bg-gradient-to-r from-[#8b6f47] to-[#a68b5b] text-white hover:from-[#745a3a] hover:to-[#8b6f47] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base py-3.5",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
