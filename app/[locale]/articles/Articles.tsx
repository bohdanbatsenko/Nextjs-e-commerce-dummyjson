import Image from "next/image";
import Link from "next/link";
// Internationalization
import { createTranslation } from "@/app/i18n/server";
import type { LocaleTypes } from "@/app/i18n/settings";

const Articles = async ({articles, locale}: {
  articles: any;
  locale: string;
}):Promise<JSX.Element> => {
  const { t } = await createTranslation(locale as LocaleTypes, "common");
  // const { isEnabled } = draftMode();
  // const articles = await getAllArticles(3, locale, false);

  return (
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
  )
}

export default Articles;