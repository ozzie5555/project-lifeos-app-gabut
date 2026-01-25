import { ReactNode } from "react";

interface WidgetProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export default function Widget({ title, children, className = "", icon }: WidgetProps) {
  return (
    <div
      className={`
        bg-zinc-900 rounded-2xl p-4  /* Padding dikecilkan jadi 4 (16px) */
        border border-zinc-800
        flex flex-col
        ${className}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lime-400/80">{icon}</span>}
        <h3 className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
          {title}
        </h3>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}