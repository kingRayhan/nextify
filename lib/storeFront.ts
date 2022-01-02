const storeFront = async (query, variables = {}) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    return await res.json();
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
export default storeFront;
