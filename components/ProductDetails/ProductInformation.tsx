import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import ProductVariantSelector from "./ProductVariantSelector";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductOptions = ({ description, variants = [], defaultPrice }) => {
  const [selectedVarientId, setSelectedVarientId] = useState(variants[0].id);
  const [price, setPrice] = useState(defaultPrice.amount);

  const findVariant = (variantId) => {
    return variants.find((variant) => variant.id === variantId);
  };

  const handleChangeVariant = (variantId) => {
    const variant = findVariant(variantId);
    setSelectedVarientId(variantId);
    console.log({ variant, selectedVarientId });
    setPrice(variant.priceV2.amount);
  };

  return (
    <>
      <div className="mt-4 lg:mt-0 lg:row-span-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl text-gray-900">
          {defaultPrice.currencyCode} {price}
        </p>
        <form className="mt-10">
          <label htmlFor="variant">Select a variant</label>
          <select
            id="variant"
            className="w-full rounded"
            value={selectedVarientId}
            onChange={(e) => handleChangeVariant(e.target.value)}
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title}
              </option>
            ))}
          </select>

          {/* <ProductVariantSelector /> */}

          <button
            type="submit"
            className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to bag
          </button>
        </form>
      </div>
      <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        {/* Description and details */}
        <div>
          <span className="sr-only">Description</span>
          <div
            className="prose porse-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProductOptions;
