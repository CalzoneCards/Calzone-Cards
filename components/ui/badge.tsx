import * as React from 'react';

export function Badge(
  { className = '', ...props }: React.HTMLAttributes<HTMLSpanElement>
) {
  return (
    <span
      {...props}
      className={`text-xs px-2 py-1 rounded-full border ${className}`}
    />
  );
}
