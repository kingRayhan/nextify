import DashboardLayout from "@/components/layouts/DashboardLayout";
import getUser from "@/lib/getUser";
import React from "react";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <h1>Profile Page</h1>
    </DashboardLayout>
  );
};

export default ProfilePage;

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

  return {
    props: {},
  };
};
