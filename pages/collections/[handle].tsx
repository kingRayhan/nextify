import Container from "@/components/Container";
import AppLayout from "@/components/layouts/AppLayout";
import ProductCard2 from "@/components/product-cards/ProductCard2";
import ProductList from "@/components/ProductList2";
import storeFront from "@/lib/storeFront";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import React from "react";

const CollectionPage = ({ collection, products }) => {
  return (
    <>
      <Head>
        <title>Collection | {collection.title}</title>
      </Head>
      <AppLayout>
        <Container>
          <h1 className="mt-8 text-3xl font-bold">{collection.title}</h1>
        </Container>
        <ProductList
          products={products}
          title={`Product collection of ${collection.title}`}
        />
      </AppLayout>
    </>
  );
};

export default CollectionPage;

const gql = String.raw;
const CollectionHandlesQuery = gql`
  {
    collections(first: 20) {
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
    collection(handle: $handle) {
      id
      title
      image {
        altText
        url
      }
      products(first: 20) {
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
  const {
    data: { collections },
  } = await storeFront(CollectionHandlesQuery);
  return {
    paths: collections.edges.map((edge) => ({
      params: {
        handle: edge.node.handle,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {
    data: { collection },
  } = await storeFront(CollectionQuery, {
    handle: params.handle,
  });
  const { id, title, image } = collection;
  return {
    props: {
      collection: { id, title, image },
      products: collection.products.edges.map((edge) => edge.node),
    },
    revalidate: 5,
  };
};
