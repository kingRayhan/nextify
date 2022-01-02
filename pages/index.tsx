import FeaturedCategory from "@/components/FeaturedCategory";
import AppLayout from "@/components/layouts/AppLayout";
import PromoSection from "@/components/PromoSection";
import ProductList2 from "@/components/ProductList2";
import storeFront from "@/lib/storeFront";
import { GetStaticProps } from "next/types";
import Head from "next/head";

const HomePage = ({ products, collections }) => {
  return (
    <>
      <Head>
        <title>Next Shopify</title>
      </Head>
      <AppLayout>
        <ProductList2 products={products} />
        <FeaturedCategory collections={collections} />
        <PromoSection />
      </AppLayout>
    </>
  );
};

export default HomePage;

const gql = String.raw;
const ProductQuery = gql`
  {
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
`;

const CollectionQuery = gql`
  {
    collections(first: 3) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            altText
            url
          }
        }
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { products },
  } = await storeFront(ProductQuery);
  const {
    data: { collections },
  } = await storeFront(CollectionQuery);
  return {
    props: {
      products: products.edges.map((edge) => edge.node),
      collections: collections.edges.map((edge) => edge.node),
    },
  };
};
