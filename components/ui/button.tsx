import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean, className?: string };
export function Button({ className='', children, ...props }: Props){
  return <button className={`px-4 py-2 rounded-md font-medium transition active:scale-[.99] ${className}`} {...props}>{children}</button>;
}
