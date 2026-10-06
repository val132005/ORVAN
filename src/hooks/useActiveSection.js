import { useEffect, useState } from 'react';

const OBSERVER_OPTIONS = { rootMargin: '-45% 0px -50% 0px' };

/** id de la sección de <main> que ocupa el centro de la pantalla (para marcar el menú). */
export function useActiveSection() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, OBSERVER_OPTIONS);
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
