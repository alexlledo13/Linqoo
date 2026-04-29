import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "rounded-full bg-slate-950 px-5 py-3 text-sm text-white hover:bg-slate-800",
        brand: "rounded-full bg-brand-600 px-5 py-3 text-sm text-white hover:bg-brand-700",
        outline:
          "rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50",
        secondary:
          "rounded-full bg-slate-100 px-5 py-3 text-sm text-slate-900 hover:bg-slate-200",
        ghost: "rounded-full px-5 py-3 text-sm text-slate-700 hover:bg-slate-100",
        link: "px-0 py-0 text-sm text-brand-700 underline-offset-4 hover:underline"
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-sm",
        lg: "px-6 py-3.5 text-base",
        icon: "h-10 w-10 rounded-full p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
