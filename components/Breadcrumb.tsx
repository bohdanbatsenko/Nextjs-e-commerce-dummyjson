'use client';

import { useParams, usePathname } from 'next/navigation'
import Link from "next/link";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

type BreadcrumbProps = {
  title?: string,
  products?: boolean
}
const Breadcrumb:React.FC<BreadcrumbProps> = ({ title, products }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const pathname = usePathname()
  const isProductPage = pathname.startsWith('/products');
  const isArticlePage = pathname.startsWith('/articles');

  return (
    <div>
      <Link href='/'>{t("breadcrumbs.home")} /</Link>
      {isProductPage && <Link href='/products'> {t("breadcrumbs.products")} / </Link>}
      {isArticlePage && <Link href='/articles'> {t("breadcrumbs.articles")} / </Link>}
      <span>  {title }</span>
    </div>
  );
};

export default Breadcrumb;