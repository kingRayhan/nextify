import DashboardLayout from "@/components/layouts/DashboardLayout";
import LoadingIndicator from "@/components/LoadingIndicator";
import OrderHistory from "@/components/OrderHistory";
import getUser from "@/lib/getUser";
import storeFront from "@/lib/storeFront";
import Order from "@/models/Order.interface";
import classNames from "classnames";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = ({
  order,
  visible = false,
}: {
  order: Order;
  visible: boolean;
}) => {
  if (!visible) return null;

  return (
    <div
      key={order.orderNumber}
      className="px-4 py-6 rounded-lg bg-gray-50 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8"
    >
      <dl className="flex-auto space-y-6 text-sm text-gray-600 divide-y divide-gray-200 sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
        <div className="flex justify-between pt-6 sm:block sm:pt-0">
          <dt className="font-medium text-gray-900">Order number</dt>
          <dd className="sm:mt-1">#{order.orderNumber}</dd>
        </div>
        <div className="flex justify-between sm:block">
          <dt className="font-medium text-gray-900">Date placed</dt>
          <dd className="sm:mt-1">
            <time dateTime={order.processedAt}>
              {dayjs(order.processedAt).format("DD MMMM YYYY")}
            </time>
          </dd>
        </div>

        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <dt>Total amount</dt>
          <dd className="sm:mt-1">
            {order.currentTotalPrice.currencyCode}{" "}
            {order.currentTotalPrice.amount}
          </dd>
        </div>
        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
          <dt>Payment Status</dt>
          <dd
            className={classNames("sm:mt-1", {
              "text-green-600": order.financialStatus === "PAID",
              "text-red-600": order.financialStatus !== "PAID",
            })}
          >
            {order.financialStatus}
          </dd>
        </div>
      </dl>
      <Link href={`/dashboard/orders/${order.id}`}>
        <a className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
          Details
          <span className="sr-only">for order {order.orderNumber}</span>
        </a>
      </Link>
    </div>
  );
};

const OrderDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [lineItems, setLineItems] = useState<any[]>([]);
  const [order, setOrder] = useState<Order>({} as Order);

  const getOrderDetails = async () => {
    setLoading(true);
    const orderId = router.query.orderId as string;
    const { data } = await storeFront(query, { orderId });

    const items = data?.node?.lineItems?.edges.map((item) => item.node);
    // setOrder(items);
    // console.log(data);
    setLineItems(items);
    setLoading(false);
  };

  useEffect(() => {
    getOrderDetails();
  }, [router]);

  return (
    <DashboardLayout pageTitle={`Order details of #${order.orderNumber}`}>
      <LoadingIndicator loading={loading} />
      {/* <Order order={{}} visible={!loading} /> */}
      <OrderHistory products={lineItems} visible={!loading} />
    </DashboardLayout>
  );
};

export default OrderDetails;

const gql = String.raw;
const query = gql`
  query OrderDetails($orderId: ID!) {
    node(id: $orderId) {
      ... on Order {
        orderNumber
        shippingAddress {
          name
          address1
          address2
          city
          country
          countryCodeV2
          zip
          formattedArea
          province
          # currentTotalPrice {
          #   amount
          #   currencyCode
          # }
        }
        lineItems(first: 50) {
          edges {
            node {
              quantity
              title
              variant {
                title
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                product {
                  handle
                }
                image {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

// export const getServerSideProps = async (ctx) => {
//   const { token } = ctx.req.cookies;
//   const user = await getUser(token);

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   const orderId = ctx.query.orderId as string;
//   const { data } = await storeFront(query, { orderId });

//   return {
//     props: {
//       order: data.node,
//     },
//   };
// };
