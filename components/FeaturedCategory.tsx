/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
// const dummyCategories = [
//   {
//     name: "Desk and Office",
//     description: "Work from home accessories",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
//     imageAlt:
//       "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
//     href: "#",
//   },
//   {
//     name: "Self-Improvement",
//     description: "Journals and note-taking",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
//     imageAlt:
//       "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
//     href: "#",
//   },
//   {
//     name: "Travel",
//     description: "Daily commute essentials",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
//     imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
//     href: "#",
//   },
// ];

import Link from "next/link";

export default function FeaturedCategory({ collections }) {
  return (
    <div className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {collections.map((collection) => (
              <div key={collection.title} className="relative group">
                <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <h3 className="mt-6 text-xl text-gray-600">
                  <Link href={`/collections/${collection.handle}`}>
                    <a>
                      <span className="absolute inset-0" />
                      {collection.title}
                    </a>
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
