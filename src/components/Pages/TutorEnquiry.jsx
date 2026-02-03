import { React, useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Switch,
  Typography,
  List,
  Button,
  Space,
  Divider,
  Modal,
  Form,
  Input,
} from "antd";
import {
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  ContactsOutlined,
  EnvironmentFilled,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TutorCardDashboard from "./TutorCardDashboard";
import ListForStudent from "./ListForStudent";
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TutorEnquiry = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState({});
  const [filterData, setFilterData] = useState([]);
  const navigator = useNavigate();
  const [fee, setFee] = useState(0);

  const handleUpdate = (enquiries) => {
    showModal();
    setSelectedEnquiry(enquiries);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFee = (values) => {
    // setFee(e.targe.value);
    const updateData = {
      fee: values.fee,
      status: "fee",
      payment_date: null,
    };

    if (updateData) {
      axios({
        method: "post",
        url: `http://localhost:3004/updateEnquiryFee/${selectedEnquiry?.enquiry_id}`,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          Swal.fire({
            icon: "success",
            text: "You have successfully send fee details to user ",
            showConfirmButton: true,
            timer: 6000,
          }).then((result) => {
            handleCancel();
          });
        })
        .catch((error) => {
          console.log("error===>", error);
        });
    } else {
      console.log("error===> Please fill all the details");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = (data) => {
    console.log(data);
    const filtered = props?.tutorEnquiryList.filter((enquiry) => {
      return enquiry.status === data.status;
    });
    console.log("filtered data", filtered);
    setFilterData(filtered);
  };

  const handleEdit = () => {
    navigator("/faculty-details");
  };

  return (
    <Layout style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        {/* Header */}
        <Card style={{ marginBottom: 24 }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Space>
              <Avatar size={64} src="https://i.pravatar.cc/150?u=1" />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {props?.tutorData?.name}
                </Title>
                <Text type="secondary">Teacher | Tutor </Text>
              </div>
            </Space>

            <Space>
              <ProfileRow label="Contact" value={props?.tutorData?.contact} />
              <ProfileRow label="Email" value={props?.tutorData?.email} />

              <Button onClick={() => handleEdit()} icon={<EditOutlined />}>
                Edit
              </Button>
            </Space>
          </Space>
        </Card>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr ",
            gap: 24,
          }}
        >
          <Card title="About Me">
            <Paragraph type="secondary">
              {props?.tutorData?.discription}
            </Paragraph>

            <Divider />
            <ProfileRow
              label="Qulification"
              value={props?.tutorData?.qualification}
            />
            <ProfileRow
              label="Exprience"
              value={props?.tutorData?.experience}
            />
            <ProfileRow label="Medium" value={props?.tutorData?.medium} />
            <ProfileRow label="Gender" value={props?.tutorData?.gender} />
            <ProfileRow
              label="Available On"
              value={props?.tutorData?.available_on}
            />
            <ProfileRow
              label="Max Hour Per Subject"
              value={props?.tutorData?.max_hours + " hour"}
            />
            <ProfileRow label="Location" value={props?.tutorData?.city_name} />

            <Divider />

            <Space>
              <EnvironmentFilled />
              <Text strong>Address: {props?.tutorData?.address}</Text>
            </Space>
          </Card>
          {/* {console.log("enquiryList", props?.tutorEnquiryList)} */}
          {/* Conversations */}
          <Card title="My Enquiries">
            <TutorCardDashboard
              tutorCountData={props?.tutorCountData}
              handleClick={handleClick}
            />
          </Card>
        </div>
      </Content>
      <Modal
        title="Enter Fee For Teaching Students at home"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleFee}
        okText="Send"
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={handleFee}>
          <Form.Item
            layout="vertical"
            label=" Enter Fee"
            name="fee"
            rules={[
              { required: true, message: "Fee is required" },
              {
                pattern: /^[0-9]\d/,
                message: "Enter valid  number",
              },
            ]}
          >
            <Input name="fee" />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </Modal>
      <ListForStudent
        tutorEnquiryList={
          filterData?.length > 0 ? filterData : props?.tutorEnquiryList
        }
        handleUpdate={handleUpdate}
      />
    </Layout>
  );
};

export default TutorEnquiry;

function SettingItem({ label, value }) {
  return (
    <Space style={{ width: "100%" }}>
      <div>{label}</div>
      <div>{value}</div>
    </Space>
  );
}

function ProfileRow({ label, value }) {
  return (
    <Space style={{ margin: 8 }}>
      <Text strong>{label}:</Text>
      <Text type="secondary">{value}</Text>
    </Space>
  );
}
