import * as React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = '', ...props }: DivProps) {
  return <div {...props} className={`border rounded-3xl bg-white/80 ${className}`} />;
}

export function CardHeader({ className = '', ...props }: DivProps) {
  return <div {...props} className={`p-4 ${className}`} />;
}

export function CardContent({ className = '', ...props }: DivProps) {
  return <div {...props} className={`p-4 ${className}`} />;
}

export function CardFooter({ className = '', ...props }: DivProps) {
  return <div {...props} className={`p-4 ${className}`} />;
}
