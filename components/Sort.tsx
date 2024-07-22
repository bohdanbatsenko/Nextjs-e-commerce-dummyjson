'use client';

import { useParams } from 'next/navigation'
import { useFilterContext } from "@/context/filter_context";
import { FaBars } from "react-icons/fa";
import { FaGripVertical } from "react-icons/fa";
import Button from "./Button";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const Sort = () => {
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
    updateSort,
    sort,
  } = useFilterContext();
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  return (
    <div className="flex justify-between items-center gap-1 mb-2 md:mb-6">
      <div className='flex items-center justify-center gap-0.5'>
        <Button
          onClick={setGridView}
        >
         <FaGripVertical/>
        </Button>
        <Button
          onClick={setListView}
        >
          <FaBars/>
        </Button>
        <p className='sort__items ml-1.5 md:ml-4'>
        <span>{products.length}</span> {t("shop.sortItemsFound")}
      </p>
      </div>

      <form className='sort__form'>
        <label htmlFor='sort'>{t("shop.sortBy")} :</label>
        <select
          name='sort'
          id='sort'
          className='sort__input'
          value={sort}
          onChange={updateSort}
        >
          <option value='price-lowest'>{t("shop.sortPrice")} ({t("shop.sortLowest")})</option>
          <option value='price-highest'>{t("shop.sortPrice")} ({t("shop.sortHighest")})</option>
          <option value='name-a'>{t("shop.sortName")} ({t("shop.sortAZ")})</option>
          <option value='name-z'>{t("shop.sortName")} ({t("shop.sortZA")})</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;