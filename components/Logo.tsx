// Deepanshu Labs mark, traced from the brand PNG. Inherits colour via currentColor.
export function Logo({ size = 18, title }: { size?: number; title?: string }) {
  return (
    <svg
      viewBox="336 228 629 731"
      height={size}
      width={(size * 629) / 731}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      style={{ display: "block", flexShrink: 0 }}
    >
      {title && <title>{title}</title>}
      <path d="M336 508L623 228V641Q486 801 336 957ZM346 959L565 778H965L786 959Z" />
    </svg>
  );
}
