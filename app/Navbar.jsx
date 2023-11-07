'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
const Navbar = () => {
  // currentPath 
  const currentPath = usePathname();
  console.log(currentPath);
  const Links = [
    {label : 'Home', href:'/'},
    {label : 'Issues', href:'/Issues'},
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">Logo</Link>
            <ul className="flex space-x-6 ">
                {Links.map((link)=><Link
                key={link.href}
                href={link.href}
                className={classnames({
                    'text-zinc-900': currentPath === link.href,
                    'text-zinc-500': currentPath !== link.href,
                    'hover:text-zinc-800 transition-colors':true,
                })}
                >
                {link.label}
                </Link>)}
            </ul>
       

    </nav>
  )
}

export default Navbar