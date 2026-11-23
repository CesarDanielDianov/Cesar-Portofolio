import { cn } from "@/lib/utils";

/** Large animated page title + optional subtitle, shared by every inner page. */
export function PageHeader({
    children,
    subtitle,
    className,
}: {
    children: React.ReactNode;
    subtitle?: React.ReactNode;
    className?: string;
}) {
    return (
        <header className={cn("mt-32 mb-12 text-center md:mt-40 md:mb-15", className)}>
            <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl animate-[fadeDown_0.8s_ease-out_forwards]">
                {children}
            </h1>
            {subtitle && (
                <p className="mt-4 text-sm text-slate-500 opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards] sm:text-base md:mt-5 dark:text-gray-400">
                    {subtitle}
                </p>
            )}
        </header>
    );
}
