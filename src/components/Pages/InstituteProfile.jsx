import React, { useRef, useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import axios from "axios";

import {
  Card,
  Typography,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import ImageUpload from "./ImageUpload";
const { Title, Text } = Typography;
const { TextArea } = Input;
const InstituteProfile = () => {
  const [form] = Form.useForm();
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]); // 🧠 State to store form values
  const [instituteData, setInstituteData] = useState({
    institute_id: "",
    institute_name: "",
    institute_discription: "",
    institute_logo: "",
    email: "",
    contact: "",
    address: "",
    state: "",
    city: "",
    stateName: "",
    cityName: "",
    pincode: "",
    vision: "",
    creation_date: new Date().toISOString().split("T")[0],
  });

  // #5021ff

  React.useEffect(() => {
    getStateData();
    getDistrictData();
    getInstituteDetails();
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

  const getInstituteDetails = () => {
    const email = sessionStorage.getItem("userId");
    console.log("email===>", email);
    axios
      .get(`http://localhost:3004/getInstituteDetails/0/${email}`)
      .then((response) => {
        console.log("institute details===>", response.data);
        if (response.data.length > 0) {
          const data = response.data[0];
          form.setFieldsValue({
            name: data.institute_name,
            instituteDetails: data.institute_discription,
            instituteAddress: data.address,
            contactNumber: data.contact,
            emailId: data.email,
            objective: data.vision,
            stateName: data.state_name,
            cityName: data.city_name,
          });
          console.log("data===>", districtData, stateData);
          setInstituteData({
            ...instituteData,
            institute_id: data.institute_id,
            institute_name: data.institute_name,
            institute_discription: data.institute_discription,
            institute_logo: data.institute_logo,
            email: data.email,
            contact: data.contact,
            address: data.address,
            state: data.state,
            city: data.city,
            stateName: data.state_name,
            cityName: data.city_name,
            pincode: data.pincode,
            vision: data.vision,
            creation_date: data.creation_date,
          });
          setInitialValues();
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  const setInitialValues = () => {
    console.log("instituteData===>", stateData, districtData);
  };
  // Handle form submission
  const handleFinish = (values) => {
    setInstituteData({
      ...instituteData,
      values,
    });
  };

  // const handleSelectChange = (value, name) => {
  //   console.log(`selected ${value}`);
  // };

  const handleSaveData = () => {
    console.log("Submitted Data:", instituteData);
    const updateData = {
      institute_name: instituteData.values.institute_name,
      institute_discription: instituteData.values.institute_discription,
      institute_logo: null,
      address: instituteData.values.address,
      state: instituteData.values.state,
      city: instituteData.values.city,
      pincode: instituteData.values.pincode,
      vision: instituteData.values.vision,
      creation_date: instituteData.creation_date,
      entry_date: instituteData.creation_date,
    };

    // Here, you can send 'letterData' to your backend or perform other actions
    if (instituteData) {
      axios({
        method: "post",
        url: `http://localhost:3004/updateinstitute/${instituteData.institute_id}`,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
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
      <Title level={3} style={{ textAlign: "center", paddingBottom: "20px" }}>
        Add Institute Details
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
          label="Name of Institute"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Institute name" />
        </Form.Item>

        <Form.Item
          label="Contact number"
          name="contactNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your number" disabled />
        </Form.Item>
        <Form.Item label="Email ID" name="emailId" rules={[{ required: true }]}>
          <Input placeholder="Enter your Emial Id" disabled />
        </Form.Item>
        <Form.Item
          label="Institute Objective (Slogun)"
          name="objective"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Learning" />
        </Form.Item>

        <Form.Item
          label="Institute Details"
          name="instituteDetails"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} placeholder="Enter Institute Details" />
        </Form.Item>
        <Form.Item
          label="Institute Address"
          name="instituteAddress"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} placeholder="Enter Institute Address" />
        </Form.Item>
        <Form.Item label="State" name="state" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "state")}
            name="stateName"
          >
            {stateData.map((data, idd) => {
              return (
                <option key={idd} value={data.id}>
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
            name="cityName"
          >
            {districtData.map((data, idd) => {
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
            onClick={console.log("Letter Data:", instituteData)}
          >
            Preview Details
          </Button>
          <Button type="default" onClick={() => handleSaveData()}>
            Submit
          </Button>
        </Space>
      </Form>
    </AuthLayout>
  );
};

export default InstituteProfile;
