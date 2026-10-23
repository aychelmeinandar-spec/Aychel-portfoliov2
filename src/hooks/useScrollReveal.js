import { useEffect } from "react";

/**
 * Hook to trigger reveal animations on scroll using IntersectionObserver.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      "main section.reveal, .project-card, .stack-item"
    );

    // Samakan kelas animasi agar section, kartu proyek, dan toolkit memakai satu sistem.
    elements.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}
