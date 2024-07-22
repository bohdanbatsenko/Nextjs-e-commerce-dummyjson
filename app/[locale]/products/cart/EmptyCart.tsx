import { useParams } from 'next/navigation';
import Link from "next/link";
import Button from "@/components/Button";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const EmptyCart = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  return (
    <main>
      <div className='w-full my-8 flex justify-center'>
        <div className='empty-cart text-center'>
          <h2 className="text-2xl mb-6">
          {t("shop.cart.msgEmptyCart")}
          </h2>
          <Button>
            <Link href='/products'>{t("shop.cart.shopNow")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EmptyCart;