import AppLayout from "@/components/layouts/AppLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useUser from "@/hooks/useUser";
import getUser from "@/lib/getUser";
import React from "react";

const Dashboard = () => {
  const { user, loading } = useUser();
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
    </DashboardLayout>
  );
};

export default Dashboard;

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
