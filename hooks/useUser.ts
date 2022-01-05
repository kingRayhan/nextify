import storeFront from "@/lib/storeFront";
import React from "react";

const gql = String.raw;
const query = gql`
  mutation ($token: String!) {
    customer(customerAccessToken: $token) {
      displayName
      email
    }
  }
`;

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const fetchUser = async () => {
    //   storeFront()
  };

  React.useEffect(() => {}, []);

  return {};
};

export default useUser;
