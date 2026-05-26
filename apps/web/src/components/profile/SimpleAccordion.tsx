import { useState, type ReactNode } from 'react';

interface SimpleAccordionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function SimpleAccordion({ title, subtitle, children, defaultOpen = false }: SimpleAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-section ${open ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <div>
          <div className="accordion-title">{title}</div>
          <div className="accordion-subtitle">{subtitle}</div>
        </div>
        <div className="accordion-header-right">
          <svg className="accordion-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="accordion-body">
        <div className="accordion-inner">
          {children}
        </div>
      </div>
    </div>
  );
}
