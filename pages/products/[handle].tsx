import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import AppLayout from "@/components/layouts/AppLayout";
import { GetStaticPaths, GetStaticProps } from "next/types";
import storeFront from "@/lib/storeFront";
import Link from "next/link";
import RecommendedProducts from "@/components/ProductDetails/RecommendedProducts";
import { useRouter } from "next/router";
import ProductInformation from "@/components/ProductDetails/ProductInformation";

const footerNavigation = {
  account: [
    { name: "Manage Account", href: "#" },
    { name: "Saved Items", href: "#" },
    { name: "Orders", href: "#" },
    { name: "Redeem Gift card", href: "#" },
  ],
  service: [
    { name: "Shipping & Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
    { name: "Get in touch", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  connect: [
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
    { name: "Twitter", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Breadcrumbs = ({ collection, productTitle }) => (
  <nav aria-label="Breadcrumb">
    <ol
      role="list"
      className="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      {collection && (
        <li>
          <div className="flex items-center">
            <Link href={`/collections/${collection.handle}`}>
              <a className="mr-2 text-sm font-medium text-gray-900">
                {collection.title}
              </a>
            </Link>
            <svg
              width={16}
              height={20}
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-5 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
      )}

      <li className="text-sm">
        <span
          aria-current="page"
          className="font-medium text-gray-500 hover:text-gray-600"
        >
          {productTitle}
        </span>
      </li>
    </ol>
  </nav>
);

const Gallery = ({ images }) => {
  return (
    <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="hidden overflow-hidden rounded-lg aspect-w-3 aspect-h-4 lg:block">
        <img
          src={images[0]?.url}
          alt={images[0]?.altText}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
          <img
            src={images[1]?.url}
            alt={images[1]?.altText}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
          <img
            src={images[2]?.url}
            alt={images[2]?.altText}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
      <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
        <img
          src={images[3]?.url}
          alt={images[3]?.altText}
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
};

export default function ProductDetails({ product }) {
  const router = useRouter();
  const [relatedProductsLoading, setRelatedProductLoading] =
    useState<boolean>(false);

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  // const [open, setOpen] = useState(false);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const images = product.images.edges.map((edge) => ({ ...edge.node }));

  // get related products
  const relatedProductsList = async (productId) => {
    const gql = String.raw;
    const query = gql`
      query ($id: ID!) {
        productRecommendations(productId: $id) {
          id
          title
          handle
          tags
          featuredImage {
            altText
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    `;
    setRelatedProductLoading(true);
    const {
      data: { productRecommendations },
    } = await storeFront(query, {
      id: productId,
    });

    setRelatedProducts(productRecommendations);
    setRelatedProductLoading(false);
  };

  useEffect(() => {
    relatedProductsList(product.id);
  }, [router]);

  return (
    <AppLayout>
      <main className="pt-10 sm:pt-16">
        <Breadcrumbs
          collection={product?.collections?.edges[0]?.node}
          productTitle={product.title}
        />

        {/* Image gallery */}
        <Gallery images={images} />

        <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>
          <ProductInformation
            description={product?.descriptionHtml || ""}
            variants={product.variants.edges.map((edge) => ({ ...edge.node }))}
            defaultPrice={product.priceRange.minVariantPrice}
          />
        </div>

        <RecommendedProducts products={relatedProducts} />
      </main>
    </AppLayout>
  );
}

const gql = String.raw;
const ProductQuery = gql`
  query ($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      availableForSale
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      # options {
      #   name
      #   values
      # }
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 6) {
        edges {
          node {
            altText
            url
          }
        }
      }
      tags
      collections(first: 1) {
        edges {
          node {
            handle
            id
            title
          }
        }
      }
    }
  }
`;

const ProductHandlesQuery = gql`
  {
    products(first: 100) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {
    data: { product },
  } = await storeFront(ProductQuery, {
    handle: params.handle,
  });
  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { products },
  } = await storeFront(ProductHandlesQuery);

  const paths = products.edges.map((edge) => ({
    params: {
      handle: edge.node.handle,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
