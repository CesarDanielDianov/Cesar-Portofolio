import { cn } from "@/lib/utils";

/** Large animated page title shared by every inner page. */
export function PageHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h1
            className={cn(
                "mt-32 mb-12 text-center text-4xl font-bold sm:text-5xl md:mt-40 md:mb-15 md:text-6xl",
                "animate-[fadeDown_0.8s_ease-out_forwards]",
                className
            )}
        >
            {children}
        </h1>
    );
}
