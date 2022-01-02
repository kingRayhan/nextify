import React from "react";

const ProductCard = ({ product }) => {
  return (
    <a key={product.id} href={product.href} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-lg text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-indigo-600">
          {product.price}
        </p>
      </div>

      <button className=" bg-gray-200 rounded text-center py-2  mt-2 text-sm  w-full">
        Add to card
      </button>
    </a>
  );
};

export default ProductCard;
