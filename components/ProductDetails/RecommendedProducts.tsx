import Link from "next/link";
// import React from "react";
// const statisProducts = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   // More products...
// ];
const RecommendedProducts = ({
  products,
  title = "Customers also purchased",
}) => {
  return (
    <section aria-labelledby="related-products-heading" className="bg-white">
      <div className="max-w-2xl px-4 py-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h2
          id="related-products-heading"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product?.featuredImage?.url}
                  alt={product?.featuredImage?.altText}
                  className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/products/${product.handle}`}>
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {product.tags.join(" ")}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.priceRange.minVariantPrice.currencyCode}{" "}
                  {product.priceRange.minVariantPrice.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
