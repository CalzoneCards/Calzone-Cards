import * as React from 'react';
export function Card({className='', children}:{className?:string, children:React.ReactNode}){ return <div className={`border rounded-2xl bg-white/80 ${className}`}>{children}</div>; }
export function CardHeader({className='', children}:{className?:string, children:React.ReactNode}){ return <div className={`p-4 ${className}`}>{children}</div>; }
export function CardContent({className='', children}:{className?:string, children:React.ReactNode}){ return <div className={`p-4 ${className}`}>{children}</div>; }
export function CardFooter({className='', children}:{className?:string, children:React.ReactNode}){ return <div className={`p-4 ${className}`}>{children}</div>; }
