import { ElementType, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ActionListItemProps {
  icon?: ElementType | null;
  customIcon?: ReactNode;
  label: string;
  description?: ReactNode;
  href?: string | null;
  onClick?: () => void;
  rightElement?: ReactNode;
  iconColor?: string;
  iconBg?: string;
  badge?: ReactNode;
  variant?: "card" | "plain";
  className?: string;
}

export default function ActionListItem({
  icon: Icon,
  customIcon,
  label,
  description,
  href,
  onClick,
  rightElement,
  iconColor = "text-main",
  iconBg = "bg-orange-100",
  badge,
  variant = "card",
  className = "",
}: ActionListItemProps) {
  const content = (
    <>
      <div className={`relative size-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        {Icon ? <Icon size={18} className={iconColor} /> : customIcon}
        {badge && (
          <span className="absolute -top-0.5 -right-0.5">{badge}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800">{label}</p>
        {description && (
          typeof description === 'string' ? (
            <p className="text-xs text-neutral-500">{description}</p>
          ) : (
            description
          )
        )}
      </div>
      {rightElement !== undefined ? rightElement : <ChevronRight size={18} className="text-neutral-400 shrink-0" />}
    </>
  );

  const baseClass = `flex items-center gap-3 transition w-full text-left ${
    variant === "card"
      ? "p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50"
      : "py-1"
  } ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={baseClass}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {content}
    </button>
  );
}
