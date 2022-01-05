import AppLayout from "@/components/layouts/AppLayout";
import withUser from "@/lib/withUser";
import React from "react";

const Dashboard = ({ user }) => {
  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
    </AppLayout>
  );
};

export default Dashboard;

export const getServerSideProps = async (ctx) => {
  const user = await withUser(ctx);

  return {
    props: {
      user,
    },
  };
};
