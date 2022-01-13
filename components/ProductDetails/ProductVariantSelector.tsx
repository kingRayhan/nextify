import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = {
  href: "#",
  average: 4,
  totalCount: 117,
  featured: [
    {
      id: 1,
      title: "This is the best white t-shirt out there",
      rating: 5,
      content: `
        <p>I've searched my entire life for a t-shirt that reflects every color in the visible spectrum. Scientists said it couldn't be done, but when I look at this shirt, I see white light bouncing right back into my eyes. Incredible!</p>
      `,
      author: "Mark Edwards",
      avatarSrc:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      title: "Adds the perfect variety to my wardrobe",
      rating: 4,
      content: `
        <p>I used to be one of those unbearable minimalists who only wore the same black v-necks every day. Now, I have expanded my wardrobe with three new crewneck options! Leaving off one star only because I wish the heather gray was more gray.</p>
      `,
      author: "Blake Reid",
      avatarSrc:
        "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    },
    {
      id: 3,
      title: "All good things come in 6-Packs",
      rating: 5,
      content: `
        <p>Tasty beverages, strong abs that will never be seen due to aforementioned tasty beverages, and these Basic Tees!</p>
      `,
      author: "Ben Russel",
      avatarSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

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

const ProductVariantSelector = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Size guide
        </a>
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {product.sizes.map((size) => (
            <RadioGroup.Option
              key={size.name}
              value={size}
              disabled={!size.inStock}
              className={({ active }) =>
                classNames(
                  size.inStock
                    ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                    : "bg-gray-50 text-gray-200 cursor-not-allowed",
                  active ? "ring-2 ring-indigo-500" : "",
                  "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                  {size.inStock ? (
                    <div
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "absolute -inset-px rounded-md pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                    >
                      <svg
                        className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="currentColor"
                      >
                        <line
                          x1={0}
                          y1={100}
                          x2={100}
                          y2={0}
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  )}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProductVariantSelector;
