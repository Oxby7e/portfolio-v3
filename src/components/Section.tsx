import { ReactNode } from "react";

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ title, children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-12 ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}
