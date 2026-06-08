import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-balaqai-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-balaqai-secondary text-white shadow-md hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]",
        accent: "bg-balaqai-accent text-white shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        outline: "border border-balaqai-primary text-balaqai-primary bg-transparent hover:bg-balaqai-primary/10",
        ghost: "hover:bg-balaqai-primary/10 hover:text-balaqai-primary",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-3",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };