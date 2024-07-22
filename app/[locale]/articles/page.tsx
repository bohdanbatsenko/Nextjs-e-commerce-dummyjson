import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllArticles } from "@/lib/api/apiArticles";
import Articles from './Articles';
import { draftMode } from "next/headers";
// Internationalization
import { createTranslation } from "@/app/i18n/server";
import type { LocaleTypes } from "@/app/i18n/settings";

const ArticlesPage = async ({ params }) => {
  const { t } = await createTranslation(params.locale as LocaleTypes, "common");
  const { isEnabled } = draftMode();
  const articles = await getAllArticles(3, params.locale, false);

  return ( 
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <Breadcrumb />
          <Suspense fallback={<div>Loading...</div>}>
              {articles && <Articles articles={articles} locale={params.locale}/>}
          </Suspense>
        </div>
      </section>
    </main>    
  )
}

export default ArticlesPage;