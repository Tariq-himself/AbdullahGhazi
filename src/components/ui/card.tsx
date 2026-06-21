import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Disable the 3D tilt/parallax hover effect. */
  disableTilt?: boolean;
  /**
   * Tilt intensity multiplier. 0 = flat, 1 = default, >1 = more dramatic.
   * Per-card tuning for cinematic tone. Defaults to 1.
   */
  tiltIntensity?: number;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onFocus,
      onBlur,
      disableTilt,
      tiltIntensity = 1,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const rafRef = React.useRef<number | null>(null);
    const pendingRef = React.useRef<{ x: number; y: number } | null>(null);
    const reducedMotionRef = React.useRef<boolean>(false);
    const coarsePointerRef = React.useRef<boolean>(false);

    React.useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const mqCoarse = window.matchMedia("(hover: none), (pointer: coarse)");
      reducedMotionRef.current = mqMotion.matches;
      coarsePointerRef.current = mqCoarse.matches;
      const onMotion = (e: MediaQueryListEvent) => {
        reducedMotionRef.current = e.matches;
      };
      const onCoarse = (e: MediaQueryListEvent) => {
        coarsePointerRef.current = e.matches;
      };
      mqMotion.addEventListener?.("change", onMotion);
      mqCoarse.addEventListener?.("change", onCoarse);
      return () => {
        mqMotion.removeEventListener?.("change", onMotion);
        mqCoarse.removeEventListener?.("change", onCoarse);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const effectiveIntensity = () => {
      if (disableTilt || reducedMotionRef.current) return 0;
      // Soften on touch / coarse-pointer devices
      const base = Math.max(0, tiltIntensity);
      return coarsePointerRef.current ? base * 0.35 : base;
    };

    const flushTilt = () => {
      rafRef.current = null;
      const node = innerRef.current;
      const p = pendingRef.current;
      if (!node || !p) return;
      const i = effectiveIntensity();
      if (i === 0) return;
      const rx = (0.5 - p.y) * 6 * i;
      const ry = (p.x - 0.5) * 8 * i;
      node.style.setProperty("--card-rx", `${rx}deg`);
      node.style.setProperty("--card-ry", `${ry}deg`);
      node.style.setProperty("--card-mx", `${p.x * 100}%`);
      node.style.setProperty("--card-my", `${p.y * 100}%`);
    };

    const scheduleTilt = (clientX: number, clientY: number) => {
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      pendingRef.current = {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
      };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(flushTilt);
      }
    };

    const activate = () => {
      const node = innerRef.current;
      if (!node) return;
      node.style.setProperty("--card-active", "1");
      // Promote to its own layer only while interacting
      node.style.willChange = "transform";
    };

    const deactivate = () => {
      const node = innerRef.current;
      if (!node) return;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      pendingRef.current = null;
      node.style.setProperty("--card-rx", "0deg");
      node.style.setProperty("--card-ry", "0deg");
      node.style.setProperty("--card-active", "0");
      // Release layer after the transition settles
      window.setTimeout(() => {
        if (node) node.style.willChange = "";
      }, 320);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (effectiveIntensity() === 0) return;
      scheduleTilt(e.clientX, e.clientY);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (effectiveIntensity() === 0) return;
      activate();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      deactivate();
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (e.pointerType === "touch") {
        // Subtle touch press feedback only
        activate();
      }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerUp?.(e);
      if (e.pointerType === "touch") deactivate();
    };

    const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerCancel?.(e);
      if (e.pointerType === "touch") deactivate();
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(e);
      activate();
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(e);
      deactivate();
    };

    const style: React.CSSProperties = {
      ...(props.style ?? {}),
      // Exposed for CSS so designers can also read it from devtools
      ["--card-tilt-intensity" as never]: String(Math.max(0, tiltIntensity)),
    };

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn("card-tilt", className)}
        {...props}
        style={style}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
