'use client';

import Link from "next/link";

const Breadcrumb = ({ title, products }) => {
  return (
    <div>
      <Link href='/'>Home /</Link>
      {products && <Link href='/products'> prodcuts / </Link>}
      <span>  {title && title.slice(20)}</span>
    </div>
  );
};

export default Breadcrumb;