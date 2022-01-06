import DashboardLayout from "@/components/layouts/DashboardLayout";
import OrderHistory from "@/components/OrderHistory";
import getUser from "@/lib/getUser";
import storeFront from "@/lib/storeFront";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const OrderDetails = ({ order }) => {
  //   const router = useRouter();
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [lineItems, setLineItems] = useState<any[]>([]);

  //   const getOrderDetails = async () => {
  //     setLoading(true);
  //     const orderId = router.query.orderId as string;
  //     const { data } = await storeFront(query, { orderId });

  //     // console.log(data);
  //     const items = data?.node?.lineItems?.edges.map((item) => item.node);
  //     setLineItems(items);
  //     console.log(items);
  //     // setOrders(data.customer.orders.edges.map((order) => order.node));
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     getOrderDetails();
  //   }, [router]);

  return (
    <DashboardLayout pageTitle={`Order details of #${order.orderNumber}`}>
      <h1>Heyyy</h1>
      <pre>{JSON.stringify({ order }, undefined, 2)}</pre>
      {/* <OrderHistory products={lineItems} /> */}
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
        }
        lineItems(first: 50) {
          edges {
            node {
              currentQuantity
              title
              variant {
                title
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

export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  const user = await getUser(token);

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const orderId = ctx.query.orderId as string;

  const { data } = await storeFront(query, { orderId });

  return {
    props: {
      order: data.node,
    },
  };
};
