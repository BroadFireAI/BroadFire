import { useEffect, useRef } from 'react';

/**
 * Hook that adds the `.is-visible` class when the element enters the viewport.
 * Works with the `.reveal-on-scroll` CSS class defined in index.css.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
