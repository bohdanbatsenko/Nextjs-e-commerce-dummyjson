// Set a variable that contains all the fields needed for articles when a fetch for
// content is performed
const ARTICLE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  details {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  date
  authorName
  categoryName
  articleImage {
    url
  }
`;

async function fetchGraphQL(query, variables, preview = false) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
      next: { 
        tags: ["articles"],
        revalidate: 3
      },
    }
  ).then((response) => response.json());
}

export function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.knowledgeArticleCollection?.items;
}

export async function getAllArticles(
  limit = 6,
  locale = 'en-US',
  isDraftMode = false
) {
  const articles = await fetchGraphQL(
    `query {
      knowledgeArticleCollection(
        where:{slug_exists: true}, 
        locale: "${locale}", 
        order: date_DESC, 
        limit: ${limit},
        preview: false
  ) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    {
      limit: limit,
      locale: 'en-US',
      preview: false
    },
    false
  );
  console.log(articles)
  return extractArticleEntries(articles);
}


export async function getArticle(
  slug,
  locale = 'en-US',
  isDraftMode = false
) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticleCollection(
          where:{slug: "${slug}"},
          limit: 1,
          locale: "${locale}",
          preview: false
          ) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
      {
        locale: 'en-US',
        preview: false
      },
    false
  );

  return article?.data?.knowledgeArticleCollection?.items[0];
}