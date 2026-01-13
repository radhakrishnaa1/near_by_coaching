import React, { useRef, useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Space,
  Select,
} from "antd";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import AuthLayout from "../Layouts/AuthLayout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { STUDENTDASHBOARD } from "../../constants/Routes";
const { Title, Text } = Typography;
const { TextArea } = Input;

const StudentDetails = (props) => {
  const [form] = Form.useForm();
  const [studentData, setStudentData] = React.useState("");
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const navigate = useNavigate();
  // 🧠 State to store form values

  // Handle form submission

  React.useEffect(() => {
    getStudentDetails();
    getStateData();
    getDistrictData();
  }, []);
  const getStateData = () => {
    axios
      .get("http://localhost:3004/getStateData")
      .then((response) => {
        setStateData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the state data!", error);
      });
  };

  const getDistrictData = () => {
    axios
      .get("http://localhost:3004/getDistrictsData")
      .then((response) => {
        setDistrictData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };
  // {
  //         "student_id": 6,
  //         "student_name": "ada sharma",
  //         "email": "ada@gmail.com",
  //         "contact": null,
  //         "address": null,
  //         "state": null,
  //         "city": null,
  //         "student_class": null,
  //         "student_pic": null,
  //         "creation_date": "2026-01-12T18:30:00.000Z"
  //     }
  const getStudentDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);

    props.handleSpinner(true);
    axios
      .get(`http://localhost:3004/getStudentByEMail/${email}`)
      .then((response) => {
        console.log("student details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          form.setFieldsValue({
            address: data.address,

            city: data.city,
            city_name: data.city_name,
            contact: data.contact,

            creation_date: data.creation_date,

            email: data.email,
            name: data.student_name,
            photo: data.photo,
            class: data.student_class,
            state: data.state,
            state_name: data.state_name,
          });
          setStudentData(response.data[0]);
          Swal.close();
          // console.log("data===>", districtData, stateData);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);

    const updateData = {
      student_name: values.name,
      contact: values.contact,
      address: values.address,
      state: values.state,
      city: values.city,
      student_class: values.class,
      student_pic: "",
    };

    if (updateData) {
      axios({
        method: "post",
        url: `http://localhost:3004/updateStudentProfile/${studentData?.email}`,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
          Swal.fire({
            icon: "success",
            text: "You have successfully Updated your profile",
            showConfirmButton: true,
            timer: 6000,
          }).then((result) => {
            navigate(STUDENTDASHBOARD);
          });
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      console.log("error===> Please fill all the details");
    }
  };

  return (
    <AuthLayout>
      <Title level={5} style={{ textAlign: "center" }}>
        UpDate Profile
      </Title>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <ImageUpload />
        </div>
        <Form.Item
          label="Name of Student"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>

        <Form.Item label="Class " name="class" rules={[{ required: true }]}>
          <Input placeholder="Enter Class" />
        </Form.Item>

        <Form.Item
          label="Contact number"
          name="contact"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your number" />
        </Form.Item>
        <Form.Item label="Email ID" name="email" rules={[{ required: true }]}>
          <Input placeholder="Enter your Emial Id" />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <TextArea rows={6} placeholder="Enter Address" />
        </Form.Item>

        <Form.Item label="State" name="state" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "state")}
            name="state"
          >
            {stateData?.map((data, idd) => {
              return (
                <option key={idd} value={data.state_code}>
                  {data.name}
                </option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="City" name="city" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "city")}
            name="city_name"
          >
            {districtData?.map((data, idd) => {
              return (
                <option key={idd} value={data.city_code}>
                  {data.name}
                </option>
              );
            })}
          </Select>
        </Form.Item>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={console.log("Letter Data:", letterData)}
          >
            Update Profile
          </Button>
          <Button type="default">Print Letter</Button>
        </Space>
      </Form>
    </AuthLayout>
  );
};

export default StudentDetails;
