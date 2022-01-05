import getUser from "@/lib/getUser";
import storeFront from "@/lib/storeFront";
import { getCookie, removeCookies } from "cookies-next";
import cookies from "nookies";
import React from "react";

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);

  const fetchUser = async () => {
    setLoading(true);
    const { token } = cookies.get();
    const user = await getUser(token);
    if (user) {
      setUser(user);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  };

  const logout = () => {
    removeCookies("token");
    setUser(null);
    setAuthenticated(false);

    // reload
    window.location.reload();
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, authenticated, logout };
};

export default useUser;
