import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const swButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        heroPrimary:
          "border border-transparent bg-primary text-primary-foreground hover:border-foreground hover:bg-white hover:text-black",
        secondary: "border border-primary bg-background text-foreground hover:bg-accent-soft",
        yellow: "bg-accent text-accent-foreground hover:bg-accent-hover",
        onDark: "bg-ink-foreground text-ink hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function SWButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof swButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(swButtonVariants({ variant, size }), className)} {...props} />;
}

export { swButtonVariants };
