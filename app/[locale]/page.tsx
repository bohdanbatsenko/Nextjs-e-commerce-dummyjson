import { getAllArticles } from "@/lib/api/apiArticles";
import { getAllHeroSlides } from "@/lib/api/apiHeroSlider";
import { draftMode } from "next/headers";
import HeroSlider from "./HeroSlider";
import Link from "next/link";
import Image from "next/image";
// import Articles from "./articles/Articles";
// import { Suspense } from "react";
// Internationalization
import { createTranslation } from "@/app/i18n/server";
import { LocaleTypes, locales } from "@/app/i18n/settings";

export default async function HomePage({params}) {
  const { t } = await createTranslation(params.locale as LocaleTypes, "common");
  const { isEnabled } = draftMode();
  const articles = await getAllArticles(3, params.locale, false);
  const heroSlides = await getAllHeroSlides(params.locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSlider data={heroSlides} />
      <section className="w-full pt-12">
        <div className="mx-auto container space-y-12 px-4 md:px-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t("homePage.welcomeTitle")}
              </h1>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {t("homePage.welcomeDescr")}
              </p>
            </div>
          </div>
          {/* <Suspense fallback={<div>Loading...</div>}>
            <Articles articles={articles} locale={params.locale} />
          </Suspense> */}
          <div className="space-y-12">
            <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles && articles.map((article) => (
                  <article key={article.sys.id} className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden">
                    {article.articleImage?.url && <Image
                      alt="placeholder"
                      className="aspect-[4/3] object-cover w-full"
                      height="263"
                      src={article.articleImage.url}
                      width="350"
                    />}
                    <div className="flex-1 p-6">
                      <Link href={`/articles/${article.slug}`}>
                        <h3 className="text-2xl font-bold leading-tight text-black py-4">
                          {article.title}
                        </h3>
                      </Link>
                      <div className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-800">
                        {article.categoryName}
                      </div>
                      <p className="max-w-none text-zinc-500 mt-4 mb-2 text-sm dark:text-zinc-400">
                        {article.summary}
                      </p>
                      <p className="max-w-none text-zinc-600 mt-2 mb-2 text-sm font-bold dark:text-zinc-400">
                      {t("blog.writtenBy")}: {article.authorName}
                      </p>
                      <div className="flex justify-end">
                        <Link
                          className="inline-flex h-10 items-center justify-center text-sm font-medium"
                          href={`/articles/${article.slug}`}
                        >
                          {t("blog.readMore")} →
                        </Link>
                      </div>
                    </div>
                  </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}