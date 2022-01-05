import nookies from "nookies";
import storeFront from "./storeFront";

const gql = String.raw;
const query = gql`
  query ($token: String!) {
    customer(customerAccessToken: $token) {
      displayName
      email
    }
  }
`;

const getUser = async (ctx) => {
  const cookies = nookies.get(ctx);
  const {
    data: { customer },
  } = await storeFront(query, {
    token: cookies.token,
  });

  return customer;
};
export default getUser;
