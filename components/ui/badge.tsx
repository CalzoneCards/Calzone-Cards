export function Badge({className='', children}:{className?:string, children:any}){ return <span className={`text-xs px-2 py-1 rounded-full border ${className}`}>{children}</span>; }
