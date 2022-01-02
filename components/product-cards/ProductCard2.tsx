import Link from "next/link";
import React from "react";

const ProductCard2 = ({ product }) => {
  return (
    <div
      className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 md:pb-1 flex-col items-start bg-white"
      role="button"
      title="Adidas Shoes Black"
    >
      <div className="flex mb-3 md:mb-3.5 pb-0">
        <img
          className="bg-gray-300 object-cover rounded-s-md rounded-md transition duration-150 ease-linear transform group-hover:scale-105"
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
