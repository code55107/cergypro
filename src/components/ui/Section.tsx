interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}

export default function Section({ children, className = "", as: Tag = "section", id }: SectionProps) {
  return (
    <Tag id={id} className={`bg-white ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {children}
      </div>
    </Tag>
  );
}
