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
import { useNavigate } from "react-router-dom";
import { TUTOR_DASHBOARD } from "../../constants/Routes";
import ImageUpload from "./ImageuploadTutor";
import AuthLayout from "../Layouts/AuthLayout";
import Swal from "sweetalert2";
const { Title, Text } = Typography;
const { TextArea } = Input;

const Teacherdetails = (props) => {
  const [form] = Form.useForm();
  const [teacherData, setTeacherData] = React.useState("");
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const navigator = useNavigate();
  // 🧠 State to store form values

  // Handle form submission

  React.useEffect(() => {
    getTeacherData();
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

  const getTeacherData = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/getTutorByEMail/0/${email}`)
      .then((response) => {
        console.log("tutor details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          setTeacherData(data);
          // console.log("data===>", districtData, stateData);
          form.setFieldsValue({
            address: data.address,
            available_on: data.available_on,
            city: data.city,
            city_name: data.city_name,
            contact: data.contact,
            course_id: data.course_id,
            creation_date: data.creation_date,
            discription: data.discription,
            email: data.email,
            experience: data.experience,
            institute_id: data.institute_id,
            name: data.name,
            photo: data.photo,
            qualification: data.qualification,
            state: data.state,
            state_name: data.state_name,
            teacher_id: data.teacher_id,
            max_hours: data.max_hours,
            medium: data.medium,
            stream: data.stream,
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    const stateDataArray = values.state_name.split("/");
    const cityDataArray = values.city_name.split("/");
    const updateData = {
      address: values.address,
      available_on: values.available_on,
      city: cityDataArray[0],
      city_name: cityDataArray[1],
      contact: values.contact,

      creation_date: new Date().toISOString().split("T")[0],
      discription: values.discription,
      email: values.email,
      experience: values.experience,

      name: values.name,
      contact: values.contact,
      qualification: values.qualification,
      state: stateDataArray[0],
      state_name: stateDataArray[1],
      medium: values.medium,
      stream: values.stream,
      max_hours: values.max_hours,
    };
    if (updateData) {
      props?.handleSpinner(true);
      axios({
        method: "post",
        url: `http://localhost:3004/updateTutorDetails/${teacherData.teacher_id}`,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response) {
            Swal.fire({
              icon: "success",
              text: "You have successfully updated faculty details ",
              showConfirmButton: true,
              timer: 6000,
            }).then((result) => {
              navigator(TUTOR_DASHBOARD);
            });
          }
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
        Add Tutor Details
      </Title>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <ImageUpload
            image={teacherData?.photo}
            id={teacherData?.teacher_id}
          />
        </div>
        <Form.Item
          label="Name of Tutor"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter facultyt name" />
        </Form.Item>

        <Form.Item
          label="Qualification"
          name="qualification"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Qualification" />
        </Form.Item>
        <Form.Item
          label="Experience"
          name="experience"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Experience" />
        </Form.Item>
        <Form.Item
          label="Available on"
          name="available_on"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Timing Of Teaching" />
        </Form.Item>
        <Form.Item
          label="Stream teaching"
          name="stream"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Stream" />
        </Form.Item>
        <Form.Item
          label="Max hours per student"
          name="max_hours"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Max Hours Per Student" />
        </Form.Item>
        <Form.Item label="Medium" name="medium" rules={[{ required: true }]}>
          <Select style={{ width: "100%" }} name="medium">
            <option key={1} value={"Hindi"}>
              Hindi
            </option>
            <option key={2} value={"English"}>
              English
            </option>
            <option key={3} value={"Both (Hindi/English)"}>
              Both (Hindi/English)
            </option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Contact number"
          name="contact"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your number" />
        </Form.Item>
        <Form.Item label="Email ID" name="email" rules={[{ required: true }]}>
          <Input placeholder="Enter your Emial Id" disabled />
        </Form.Item>
        <Form.Item
          label="Short Discription"
          name="discription"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} placeholder="Enter discription" />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <TextArea rows={6} placeholder="Enter Address" />
        </Form.Item>

        <Form.Item label="State" name="state_name" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "state")}
            name="state_name"
          >
            {stateData?.map((data, idd) => {
              return (
                <option key={idd} value={data.state_code + "/" + data.name}>
                  {data.name}
                </option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="City" name="city_name" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "city")}
            name="city_name"
          >
            {districtData?.map((data, idd) => {
              return (
                <option key={idd} value={data.city_code + "/" + data.name}>
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
          {/* <Button type="default">Print Letter</Button> */}
        </Space>
      </Form>
    </AuthLayout>
  );
};

export default Teacherdetails;
