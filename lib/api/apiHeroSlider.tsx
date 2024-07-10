const HERO_SLIDES = `
  title
  image {
    title
    description
    contentType
    fileName
    size
    url
    width
    height
  }
  description
`;

async function fetchGraphQL(query) {
  return fetch(
   `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["heroSlider"] },
    }
  ).then((response) => response.json());
}

function extractHeroSlidesEntries(fetchResponse) {
  return fetchResponse?.data?.heroSliderCollection?.items;
}

export async function getAllHeroSlides() {
  const slides = await fetchGraphQL(
    `query {
      heroSliderCollection {
          items {
            ${HERO_SLIDES}
          }
        }
      }`,
  );
  return extractHeroSlidesEntries(slides);
}