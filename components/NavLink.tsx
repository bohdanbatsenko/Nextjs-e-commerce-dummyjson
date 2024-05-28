'use client';
import Link from 'next/link';
import classes from './header.module.css';
import { useRouter } from 'next/navigation'

export default function NavLink({href, children}) {
  const { asPath } = useRouter();

  return (

    <Link 
      href={href}
      className={asPath === href ? classes.active : ''}
      >{children}
    </Link>
  
  )
}