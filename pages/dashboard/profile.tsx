import DashboardLayout from "@/components/layouts/DashboardLayout";
import getUser from "@/lib/getUser";
import Head from "next/head";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>My Profile | Dashboard</title>
      </Head>
      <DashboardLayout pageTitle="My Profile">
        <h1>Profile Page</h1>
      </DashboardLayout>
    </>
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
