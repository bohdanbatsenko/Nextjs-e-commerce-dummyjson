// src/component/cart/FetchHandler.ts

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export const fetchGraphQL = async <T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> => {
  try {
    const response = await fetch('https://magento.test/graphql' as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      // Log the response status and text for debugging
      const responseText = await response.text();
      console.error(`Network response was not ok: ${response.status} - ${responseText}`);
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map((err) => err.message).join(", "));
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
};