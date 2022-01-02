import Link from "next/link";
import React from "react";

const ProductCard2 = ({ product }) => {
  return (
    <div
      className="box-border flex flex-col items-start overflow-hidden bg-white rounded-md cursor-pointer group pe-0 md:pb-1"
      role="button"
      title="Adidas Shoes Black"
    >
      <div className="flex mb-3 md:mb-3.5 pb-0">
        <img
          className="object-cover transition duration-150 ease-linear transform bg-gray-300 rounded-md rounded-s-md group-hover:scale-105"
          src={product.imageSrc}
          alt={product.imageAlt}
        />
      </div>
      <div className="w-full overflow-hidden ps-0">
        <h2 className="text-heading font-semibold truncate mb-1 md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
          Men Black top sleeveless gown
        </p>
        <div className="text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 md:text-base lg:text-xl md:mt-2.5 2xl:mt-3">
          <span className="inline-block">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
