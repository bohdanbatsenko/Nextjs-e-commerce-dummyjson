'use client';

import Link from "next/link";

type BreadcrumbProps = {
  title: string,
  products?: boolean
}
const Breadcrumb:React.FC<BreadcrumbProps> = ({ title, products }) => {
  return (
    <div>
      <Link href='/'>Home /</Link>
      {products && <Link href='/products'> Products / </Link>}
      <span>  {title }</span>
    </div>
  );
};

export default Breadcrumb;