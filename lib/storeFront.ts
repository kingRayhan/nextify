const storeFront = async (query, variables = {}) => {
  const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${res.status}`);
  }

  return await res.json();
};
export default storeFront;
