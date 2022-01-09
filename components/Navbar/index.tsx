/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import Link from "next/link";
import storeFront from "@/lib/storeFront";
import Account from "./Account";
import useUser from "@/hooks/useUser";
import Cart from "./Cart";

// const navigation = [
//   { name: "Men", href: "/collections/men" },
//   { name: "Women", href: "/collections/women" },
//   { name: "Ornaments", href: "/collections/ornaments" },
// ];

const gql = String.raw;

export default function Navbar() {
  const [navigation, setNavigation] = useState([]);
  const loadCollections = async () => {
    const {
      data: { collections },
    } = await storeFront(gql`
      {
        collections(first: 5) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `);

    setNavigation(
      collections.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        href: `/collections/${node.handle}`,
      }))
    );
  };

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <header className="relative bg-white border-b border-gray-200">
      <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative px-4 pb-14 sm:static sm:px-0 sm:pb-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex flex-1">
              <Link href="/">
                <a title="Shopify commerce">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </Link>
            </div>

            <div className="absolute inset-x-0 bottom-0 overflow-x-auto border-t sm:static sm:border-t-0">
              <div className="flex items-center px-4 space-x-8 h-14 sm:h-auto">
                {navigation.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      {item.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end flex-1">
              {/* Search */}
              {/* <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <SearchIcon className="w-6 h-6" aria-hidden="true" />
              </a> */}

              {/* Cart */}
              <Cart />
              {/* Accounts */}
              <Account />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
