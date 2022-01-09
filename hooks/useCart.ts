import storeFront from "@/lib/storeFront";
import { getCookie, setCookies } from "cookies-next";
import React, { useState } from "react";
const gql = String.raw;
const createCartQuery = gql`
  mutation CreateCart($token: String) {
    cartCreate(input: { buyerIdentity: { customerAccessToken: $token } }) {
      cart {
        id
      }
    }
  }
`;

const useCart = () => {
  const [cartId, setCartId] = useState<string>(null);

  // init shopofy cart
  const boot = async () => {
    // get cart from local storage
    const cartId = getCookie("cartId");
    // if cart is not empty
    if (!cartId) {
      // set cart to cart state
      const { data } = await storeFront(createCartQuery, { token: null });
      setCartId(data.cartCreate.cart.id);
      setCookies("cartId", data.cartCreate.cart.id);
    }
  };

  return { boot };
};

export default useCart;
