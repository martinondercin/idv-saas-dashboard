import { useEffect, useState } from "react";
import { TestTube, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EnvironmentBanner() {
  const [currentEnvironment, setCurrentEnvironment] = useState(() => {
    return localStorage.getItem('environment') || 'production';
  });

  useEffect(() => {
    const handleEnvironmentChange = (event: CustomEvent) => {
      setCurrentEnvironment(event.detail);
    };

    window.addEventListener('environmentChanged', handleEnvironmentChange as EventListener);
    
    return () => {
      window.removeEventListener('environmentChanged', handleEnvironmentChange as EventListener);
    };
  }, []);

  if (currentEnvironment === 'production') {
    return null; // No banner in production for cleaner UI
  }

  return (
    <div 
      className={cn(
        "w-full border-b-2 py-2 px-6 flex items-center justify-center gap-2",
        "bg-[hsl(var(--env-sandbox-light))] border-[hsl(var(--env-sandbox-primary))]"
      )}
      role="banner"
      aria-label="Current environment: Sandbox"
    >
      <TestTube className="h-4 w-4 text-[hsl(var(--env-sandbox-dark))]" />
      <span className="text-sm font-medium text-[hsl(var(--env-sandbox-dark))]">
        🧪 Sandbox Mode - Test freely, no charges applied
      </span>
    </div>
  );
}
