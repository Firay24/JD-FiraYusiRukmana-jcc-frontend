import React, { forwardRef, ElementType } from "react";
import clsx, { ClassValue } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary" //
    | "primary-light"
    | "primary-dark"
    | "primary-outline"
    | "secondary"
    | "secondary-light"
    | "secondary-dark"
    | "secondary-outline"
    | "light"
    | "light-outline"
    | "danger"
    | "danger-outline"
    | "success"
    | "success-outline"
    | "warning"
    | "warning-outline"
    | "custom";
  as?: ElementType;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, ClassValue> = {
  primary: "bg-primary-500 text-white border border-primary-500",
  "primary-light": "bg-primary-400 text-white border border-primary-400",
  "primary-dark": "bg-primary-600 text-white border border-primary-600",
  "primary-outline": "bg-white text-primary-500 border border-primary-500",
  secondary: "bg-secondary-500 text-white border border-secondary-500",
  "secondary-light": "bg-secondary-400 text-white border border-secondary-400",
  "secondary-dark": "bg-secondary-600 text-white border border-secondary-600",
  "secondary-outline": "bg-white text-secondary-500 border border-secondary-500",
  light: "bg-neutral-200 text-black border border-neutral-200",
  "light-outline": "bg-white text-neutral-400 border border-neutral-300",
  danger: "bg-danger-500 text-white border border-danger-500",
  "danger-outline": "bg-white text-danger-500 border border-danger-500",
  success: "bg-success-500 text-white border border-success-500",
  "success-outline": "bg-white text-success-500 border border-success-500",
  warning: "bg-warning-500 text-white border border-warning-500",
  "warning-outline": "bg-white text-warning-500 border border-warning-500",
  custom: "border",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = "primary", as: Component = "button", className, children, ...props }, ref) => {
  const variantClasses = VARIANT_CLASSES[variant as NonNullable<ButtonProps["variant"]>];

  const hasPaddingX = /\bpx-\d+\b/.test(className || "");
  const hasPaddingY = /\bpy-\d+\b/.test(className || "");
  const hasPadding = /\bp-\d+\b/.test(className || "");
  const isDisabledCustom = className?.includes("disabled:");
  const isRoundedCustom = className?.includes("rounded-");

  return (
    <Component
      ref={ref}
      {...props}
      className={clsx(
        className,
        variantClasses,
        {
          "px-4": !hasPadding && !hasPaddingX,
          "py-3": !hasPadding && !hasPaddingY,
        },
        {
          "disabled:border-neutral-200 disabled:bg-neutral-200 disabled:text-neutral-400": !isDisabledCustom,
        },
        {
          "rounded-lg": !isRoundedCustom,
        },
        "flex cursor-pointer items-center justify-center gap-1 text-body",
      )}
    >
      {children}
    </Component>
  );
});

export default Button;
