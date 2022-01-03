/* This example requires Tailwind CSS v2.0+ */
// const products = [
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   // More products...
// ];

import Link from "next/link";

const Product = ({ product }) => {
  return (
    <div>
      <div className="relative">
        <div className="relative w-full overflow-hidden rounded-lg h-72">
          <a className="bg-red-400 ">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              className="object-cover object-center w-full h-full"
            />
          </a>
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            <Link href="/products/[handle]" as={`/products/${product.handle}`}>
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {product?.tags?.join(", ")}
          </p>
        </div>
        <Link href="/products/[handle]" as={`/products/${product.handle}`}>
          <a>
            <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
              />
              <p className="relative text-lg font-semibold text-white">
                {product.priceRange.minVariantPrice.currencyCode}{" "}
                {product.priceRange.minVariantPrice.amount}
              </p>
            </div>
          </a>
        </Link>
      </div>
      {/* <div className="mt-6">
        <button className="relative flex items-center justify-center w-full px-8 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200">
          Add to bag<span className="sr-only">, {product.title}</span>
        </button>
      </div> */}
    </div>
  );
};

export default function ProductList({
  products,
  title = "Hot products in the store",
}) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 pt-6 pb-16 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
