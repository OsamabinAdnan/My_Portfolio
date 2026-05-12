'use client';

interface HoverLinkProps {
  href: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HoverLink({ href, text, onClick }: HoverLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="hover-link text-neutral-400"
    >
      <span className="hover-in text-sm font-medium">
        {text}
        <div>{text}</div>
      </span>
    </a>
  );
}
