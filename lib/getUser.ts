// import nookies from "nookies";
import storeFront from "./storeFront";
import md5 from "md5";

const gql = String.raw;
const query = gql`
  query ($token: String!) {
    customer(customerAccessToken: $token) {
      displayName
      email
    }
  }
`;

const getAvatarurl = (email: string) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const getUser = async (token: string) => {
  if (!token) return null;

  const {
    data: { customer },
  } = await storeFront(query, { token });

  const avatar = getAvatarurl("rayhan095@gmail.com");

  return { ...customer, avatar };
};
export default getUser;
