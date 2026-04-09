"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---- Accordion context ---- */

type AccordionContextValue = {
  openItems: Set<string>;
  toggle: (value: string) => void;
  type: "single" | "multiple";
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>");
  return ctx;
}

/* ---- Item context ---- */

const ItemContext = React.createContext<string>("");

function useItem() {
  return React.useContext(ItemContext);
}

/* ---- Accordion root ---- */

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set();
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
  });

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") {
            next.clear();
          }
          next.add(value);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/* ---- AccordionItem ---- */

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => (
    <ItemContext.Provider value={value}>
      <div
        ref={ref}
        className={cn("border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  )
);
AccordionItem.displayName = "AccordionItem";

/* ---- AccordionTrigger ---- */

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { openItems, toggle } = useAccordion();
  const value = useItem();
  const isOpen = openItems.has(value);

  return (
    <h3 className="flex">
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        onClick={() => toggle(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&>svg]:transition-transform [&>svg]:duration-200",
          isOpen && "[&>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

/* ---- AccordionContent ---- */

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { openItems } = useAccordion();
  const value = useItem();
  const isOpen = openItems.has(value);

  return (
    <div
      ref={ref}
      className={cn(
        "grid transition-all duration-200 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
      aria-hidden={!isOpen}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-4 pt-0 text-sm", className)}>{children}</div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
