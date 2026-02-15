interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span className={`text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase ${className}`}>
      {children}
    </span>
  );
}
