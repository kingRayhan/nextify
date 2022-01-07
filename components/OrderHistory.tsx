// const orders = [
//   {
//     number: "WU88191111",
//     date: "January 22, 2021",
//     datetime: "2021-01-22",
//     invoiceHref: "#",
//     total: "$238.00",
//     products: [
//       {
//         id: 1,
//         name: "Machined Pen and Pencil Set",
//         href: "#",
//         price: "$70.00",
//         status: "Delivered Jan 25, 2021",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg",
//         imageAlt:
//           "Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.",
//       },
//       {
//         id: 2,
//         name: "Machined Pen and Pencil Set",
//         href: "#",
//         price: "$70.00",
//         status: "Delivered Jan 25, 2021",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg",
//         imageAlt:
//           "Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.",
//       },
//       {
//         id: 3,
//         name: "Machined Pen and Pencil Set",
//         href: "#",
//         price: "$70.00",
//         status: "Delivered Jan 25, 2021",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg",
//         imageAlt:
//           "Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.",
//       },
//       // More products...
//     ],
//   },
//   // More orders...
// ];

import Link from "next/link";

const OrderHistory = ({ products = [], visible = false }) => {
  if (!visible) return null;
  return (
    <div className="space-y-20">
      <div>
        <table className="w-full mt-4 text-gray-500 sm:mt-6">
          <caption className="sr-only">Products</caption>
          <thead className="text-sm text-left text-gray-500 sr-only sm:not-sr-only">
            <tr>
              <th
                scope="col"
                className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
              >
                Product
              </th>
              <th
                scope="col"
                className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
              >
                Unit Price
              </th>
              <th
                scope="col"
                className="hidden py-3 pr-8 font-normal sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="hidden py-3 pr-8 font-normal sm:table-cell"
              >
                Net Price
              </th>
              <th scope="col" className="w-0 py-3 font-normal text-right">
                Info
              </th>
            </tr>
          </thead>
          <tbody className="text-sm border-b border-gray-200 divide-y divide-gray-200 sm:border-t">
            {products.map((product, i) => (
              <tr key={i}>
                <td className="py-6 pr-8">
                  <div className="flex items-center">
                    <img
                      src={product.variant.image.url}
                      alt={product.variant.image.altText}
                      className="object-cover object-center w-16 h-16 mr-6 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.title}
                      </div>
                      <div className="mt-1 sm:hidden">{product.title}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden py-6 pr-8 sm:table-cell">
                  {product.variant.priceV2.currencyCode}{" "}
                  {product.variant.priceV2.amount}
                </td>
                <td className="hidden py-6 pr-8 sm:table-cell">
                  {product.quantity}
                </td>
                <td className="hidden py-6 pr-8 sm:table-cell">
                  {product.variant.priceV2.currencyCode}{" "}
                  {product.variant.priceV2.amount * product.quantity}
                </td>
                <td className="py-6 font-medium text-right whitespace-nowrap">
                  <Link href={`/products/${product.variant.product.handle}`}>
                    <a className="text-indigo-600">
                      View
                      <span className="hidden lg:inline"> Product</span>
                      <span className="sr-only">{product.variant.title}</span>
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
