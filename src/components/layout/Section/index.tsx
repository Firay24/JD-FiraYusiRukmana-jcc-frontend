import { useEffect, useState } from "react";

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is in view
    );

    const section = document.getElementById(id);
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [id]);

  return <section id={id}>{children}</section>;
};

export default Section;
