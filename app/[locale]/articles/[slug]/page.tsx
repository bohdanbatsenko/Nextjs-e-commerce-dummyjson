import { getAllArticles } from "@/lib/api/apiArticles";
import { getArticle } from "@/lib/api/apiArticles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { createTranslation } from "@/app/i18n/server";
import { locales, LocaleTypes } from "@/app/i18n/settings";

interface articlePageParams {
  slug: string;
  locale: string;
}

interface articlePageProps {
  params: articlePageParams;
}

// const ARTICLE_GRAPHQL_FIELDS = `
//   sys {
//     id
//   }
//   title
//   slug
//   summary
//   details {
//     json
//     links {
//       assets {
//         block {
//           sys {
//             id
//           }
//           url
//           description
//         }
//       }
//     }
//   }
//   date
//   authorName
//   categoryName
//   articleImage {
//     url
//   }
// `;

// async function fetchGraphQL(query, variables, preview = false) {
//   return fetch(
//    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${
//           preview
//             ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
//             : process.env.CONTENTFUL_ACCESS_TOKEN
//         }`,
//       },
//       body: JSON.stringify({ query, variables }),
//       next: { 
//         tags: ["articles"],
//         revalidate: 3
//       },
//     }
//   ).then((response) => response.json());
// }

// export async function getAllArticles2(limit, locale){
//   const response = await fetchGraphQL(
//     `query {
//         knowledgeArticleCollection(
//           where:{slug_exists: true}, 
//           locale: "${locale}", 
//           order: date_DESC, 
//           limit: ${limit},
//           preview: false
//     ) {
//           items {
//             ${ARTICLE_GRAPHQL_FIELDS}
//           }
//         }
//       }`,
//       {
//         limit: limit,
//         locale: 'en-US'
//       },
//       false
//   );
//    const allArticles = response.data.knowledgeArticleCollection.items;
   
//    return allArticles;
//  }

// export async function generateStaticParams(): Promise<articlePageParams[]>  {
//   const dataPerLocale = locales
//    ? await Promise.all(locales.map((locale) => getAllArticles2(6, locale)))
//      : [];

//   if (!getAllArticles2) {
//     return [];
//   }

//   const paths = dataPerLocale
//     .flatMap((data, index) =>
//       data.map((article) =>
//       article?.slug
//         ? {
//             slug: article.slug,
//             locale: locales?.[index] || "",
//           }
//         : undefined
//       )
//     )
//     .filter(Boolean);

//   return paths as articlePageParams[];
// }

// export default async function ArticlePage({params}:articlePageProps) {
//   const { isEnabled } = draftMode();
//   let article;

//   try {
//     const result = await fetchGraphQL(
//       `query GetKnowledgeArticleCollection($locale: String!) {
//         knowledgeArticleCollection (
//         where:{slug: "${params.slug}"}
//         limit: 1,
//         locale: $locale,
//         preview: false
//         ) {
//           items {
//           ${ARTICLE_GRAPHQL_FIELDS}
//           }
//         }
//       }`,
//       { 
//         locale: params.locale
//       }
//     );

//     article = result.data?.knowledgeArticleCollection?.items[0];
//   } catch (err) {
//     console.error("Error fetching article:", err);
//   }

//   if (!article) {
//     notFound();
//   }

//   const { t } = await createTranslation(article.locale as LocaleTypes, "common");


export async function generateStaticParams({params}) {
  const allArticles = await getAllArticles(params.limit, params.locale, false);

  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function KnowledgeArticlePage({
  params,
}) {
  const article = await getArticle(params.slug, params.locale, false);

  if (!article) {
    notFound();
  }
  
  const { t } = await createTranslation(article.locale as LocaleTypes, "common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <Breadcrumb title={t(article.title)}/>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {article.title}
            </h1>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {article.summary}
            </p>
          </div>
          <div className="space-y-8 lg:space-y-10">
            <Image
              alt="Article Image"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height="365"
              src={article.articleImage.url}
              width="650"
            />
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <div className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {documentToReactComponents(article.details.json)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}