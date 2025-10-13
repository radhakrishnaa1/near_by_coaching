import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";

const InstituteDashboard = () => {
  const [size, setSize] = useState("large"); // default is 'middle'

  return (
    <AuthLayout>
      <HomeCard />
    </AuthLayout>
  );
};
export default InstituteDashboard;
