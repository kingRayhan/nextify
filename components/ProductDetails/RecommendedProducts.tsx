import Image from "next/image";
import Link from "next/link";

const RecommendedProducts = ({ products, title = "You may also like" }) => {
  return (
    <section aria-labelledby="related-products-heading" className="bg-white">
      <div className="max-w-2xl px-4 py-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={product?.featuredImage?.url}
                  alt={product?.featuredImage?.altText}
                  height={350}
                  width={280}
                  layout="responsive"
                  className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                />
              </div>
              <div className="flex flex-col justify-between mt-4">
                <div>
                  <h3 className="text-base text-gray-700">
                    <Link href={`/products/${product.handle}`}>
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <span className="capitalize">{product.title}</span>
                      </a>
                    </Link>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    {product.priceRange.minVariantPrice.currencyCode}{" "}
                    {product.priceRange.minVariantPrice.amount}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 capitalize">
                    {product.tags.join(" ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
