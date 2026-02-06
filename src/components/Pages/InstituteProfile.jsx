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
  Modal,
  Select,
  Space,
} from "antd";
import Swal from "sweetalert2";
import ImageUpload from "./ImageUpload";
const { Title, Text } = Typography;
const { TextArea } = Input;
const InstituteProfile = () => {
  const [form] = Form.useForm();
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState(""); // 🧠 State to store form values
  // 🧠 State to store form values
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log("instituteData===>", instituteData);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
            state: data.state,
            city: data.city,
            pincode: data.pincode,
            cityName: data.city_name,
          });
          // console.log("data===>", districtData, stateData);
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
          // setInitialValues();
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the district data!", error);
      });
  };

  // const setInitialValues = () => {
  //   console.log("instituteData===>", stateData, districtData);
  // };
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

  const handlePreviewData = () => {
    console.log(instituteData);
    // console.log("city ", instituteData?.values?.city.split("/"))
  };
  const handleSaveData = () => {
    console.log("Submitted Data:", instituteData);
    // console.log("city ", instituteData?.values?.city.split("/"))
    const stateDataArray = instituteData?.values?.stateName.split("/");
    const cityDataArray = instituteData?.values?.cityName.split("/");

    // console.log(stateDataArray.length, cityDataArray);
    const updateData = {
      institute_name: instituteData?.values?.name,
      institute_discription: instituteData?.values?.instituteDetails,
      institute_logo: null,
      address: instituteData?.values?.instituteAddress,
      state: stateDataArray
        ? stateDataArray.length > 1
          ? stateDataArray[0]
          : instituteData?.state
        : instituteData?.state,
      state_name: stateDataArray
        ? stateDataArray.length > 1
          ? stateDataArray[1]
          : instituteData?.stateName
        : instituteData?.stateName,
      city_name: cityDataArray
        ? cityDataArray.length > 1
          ? cityDataArray[1]
          : instituteData?.cityName
        : instituteData?.cityName,
      city: cityDataArray
        ? cityDataArray.length > 1
          ? cityDataArray[0]
          : instituteData?.city
        : instituteData?.city,
      pincode: instituteData?.values?.pincode,
      vision: instituteData?.values?.objective,
      creation_date: "2001-06-11",
      entry_date: new Date().toISOString().split("T")[0],
    };
    // console.log(updateData);

    // Here, you can send 'letterData' to your backend or perform other actions
    if (updateData) {
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
          Swal.fire({
            icon: "success",
            text: "Institute Details Updated successfully",
            showConfirmButton: true,
            timer: 6000,
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
    <AuthLayout instituteData={instituteData} studentData="">
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
        <Form.Item
          label="Institute Pincode "
          name="pincode"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Pincode" />
        </Form.Item>
        <Form.Item label="State" name="stateName" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "state")}
            name="stateName"
          >
            {stateData.map((data, idd) => {
              return (
                <option key={idd} value={data.state_code + "/" + data.name}>
                  {data.name}
                </option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="City" name="cityName" rules={[{ required: true }]}>
          <Select
            style={{ width: "100%" }}
            // onChange={(value) => handleSelectChange(value, "city")}
            name="cityName"
          >
            {districtData.map((data, idd) => {
              return (
                <option key={idd} value={data.city_code + "/" + data.name}>
                  {data.name}
                </option>
              );
            })}
          </Select>
        </Form.Item>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <Button type="primary" htmlType="submit" onClick={() => showModal()}>
            Preview Details
          </Button>
          <Button type="primary" danger onClick={() => handleSaveData()}>
            Submit
          </Button>
        </Space>
      </Form>

      <Modal
        title="Preview Institute Details Before Submit"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={{
          xs: "90%",
          sm: "80%",
          md: "80%",
          lg: "80%",
          xl: "80%",
          xxl: "70%",
        }}
      >
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={8}>
            <div>Institute Name</div>
            <div>{instituteData?.values?.name}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>Email</div>
            <div>{instituteData?.values?.emailId}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>Contact</div>
            <div>{instituteData?.values?.contactNumber}</div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={8}>
            <div>Address</div>
            <div>{instituteData?.values?.instituteAddress}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>State</div>
            <div>{instituteData?.values?.stateName}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>city</div>
            <div>{instituteData?.values?.cityName}</div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={8}>
            <div> Vision</div>
            <div>{instituteData?.values?.objective}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>pincode</div>
            <div>{instituteData?.pincode}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>Formation Date</div>
            <div>{instituteData?.creation_date}</div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div> Discription</div>
            <div> {instituteData?.values?.instituteDetails}</div>
          </Col>
        </Row>
      </Modal>
    </AuthLayout>
  );
};

export default InstituteProfile;
