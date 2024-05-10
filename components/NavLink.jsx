'use client';
import Link from 'next/link';
import classes from './header.module.css';
//import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function NavLink({href, children}) {
  //const path = usePathname();
  const { asPath } = useRouter();

  return (

    <Link 
      href={href}
      className={asPath === href ? classes.active : ''}
      >{children}
      </Link>
  
    // <Link 
    //   href={href}
    //   className={path.startsWith(href) ? classes.active : undefined}>{children}
    // </Link>
  )
}