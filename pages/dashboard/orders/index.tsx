import DashboardLayout from "@/components/layouts/DashboardLayout";
import LoadingIndicator from "@/components/LoadingIndicator";
// import OrderHistory from "@/components/OrderHistory";
// import getUser from "@/lib/getUser";
import storeFront from "@/lib/storeFront";
import Order from "@/models/Order.interface";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const gql = String.raw;
const OrderHistoryQuery = gql`
  query OrderHistory($token: String!) {
    customer(customerAccessToken: $token) {
      orders(first: 5) {
        edges {
          node {
            id
            orderNumber
            currencyCode
            currentTotalPrice {
              amount
              currencyCode
            }
            financialStatus
            fulfillmentStatus
            processedAt
          }
        }
      }
    }
  }
`;

const Order = ({ order }: { order: Order }) => (
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

const OrderSummeries = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrderHistory = async () => {
    const token = getCookie("token");
    setLoading(true);
    const { data } = await storeFront(OrderHistoryQuery, { token });
    setOrders(data.customer.orders.edges.map((order) => order.node));
    setLoading(false);
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <>
      <Head>
        <title>Order History | Dashboard</title>
      </Head>
      <DashboardLayout
        pageTitle="Order History"
        subTitle=" Check the status of recent orders, manage returns, and download invoices."
      >
        <LoadingIndicator loading={loading} />
        {orders.map((order) => (
          <Order order={order} key={order.orderNumber} />
        ))}
      </DashboardLayout>
    </>
  );
};

export default OrderSummeries;

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

//   return {
//     props: {},
//   };
// };
