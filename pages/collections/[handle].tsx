import AppLayout from "@/components/layouts/AppLayout";
import ProductCard2 from "@/components/product-cards/ProductCard2";
import ProductList from "@/components/ProductList2";
import storeFront from "@/lib/storeFront";
import { GetStaticPaths, GetStaticProps } from "next/types";
import React from "react";

const CollectionPage = ({ collection, products }) => {
  return (
    <AppLayout>
      <pre>{JSON.stringify(collection, undefined, 2)}</pre>
      <ProductList
        products={products}
        title={`Product collection of ${collection.title}`}
      />
    </AppLayout>
  );
};

export default CollectionPage;

const gql = String.raw;
const CollectionHandlesQuery = gql`
  {
    collections(first: 6) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

const CollectionQuery = gql`
  query ($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      image {
        altText
        url
      }
      products(first: 8) {
        edges {
          node {
            title
            handle
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: collections } = await storeFront(CollectionHandlesQuery);
  return {
    paths: collections.collections.edges.map((edge) => ({
      params: {
        handle: edge.node.handle,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: collection } = await storeFront(CollectionQuery, {
    handle: params.handle,
  });
  const { id, title, image } = collection.collectionByHandle;
  return {
    props: {
      collection: { id, title, image },
      products: collection.collectionByHandle.products.edges.map(
        (edge) => edge.node
      ),
    },
    revalidate: 5,
  };
};
