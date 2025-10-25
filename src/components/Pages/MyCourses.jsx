import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import HomeCard from "../Pages/HomeCard";
import { Divider } from "antd";
import CourseCard from "./CourseCard";

const MyCourses = () => {
  const [size, setSize] = useState("large"); // default is 'middle'

  return (
    <AuthLayout>
      <CourseCard />
    </AuthLayout>
  );
};
export default MyCourses;
