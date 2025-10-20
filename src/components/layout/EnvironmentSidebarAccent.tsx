import { useEffect, useState } from "react";

export function useEnvironmentAccent() {
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

  return currentEnvironment;
}
