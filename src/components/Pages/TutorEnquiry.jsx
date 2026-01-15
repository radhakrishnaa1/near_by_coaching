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

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function ProfilePage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState({});
  const [fee, setFee] = useState(0);

  const handleUpdate = (enquiries) => {
    showModal();
    setSelectedEnquiry(enquiries);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const updateData = {
      fee: fee,
      status: "fee",
    };

    // if (postData) {
    //   axios({
    //     method: "post",
    //     url: `http://localhost:3004/studentEnquery`,
    //     data: postData,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then(function (response) {
    //       Swal.fire({
    //         icon: "success",
    //         text: "You have successfully registered ",
    //         showConfirmButton: true,
    //         timer: 6000,
    //       }).then((result) => {
    //         props?.handleCancel();
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("error===>", error);
    //     });
    // } else {
    //   console.log("error===> Please fill all the details");
    // }
  };
  const handleFee = (e) => {
    setFee(e.targe.value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(props);
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

              <Button icon={<EditOutlined />}>Edit</Button>
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

          {/* Conversations */}
          <Card title="My Enquiries">
            <List
              itemLayout="horizontal"
              dataSource={props?.tutorEnquiryList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      key="reply"
                      onClick={() => handleUpdate(item)}
                    >
                      Send Fee Details
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${item.name}`}
                      />
                    }
                    title={
                      item.student_name +
                      " | " +
                      item.student_email +
                      " | " +
                      item.student_contact
                    }
                    description={
                      " Address : " +
                      item.student_add +
                      " City : " +
                      item.student_city +
                      "  State : " +
                      item.student_state
                    }
                  />
                  <div>
                    <ProfileRow
                      label="Number Of Students"
                      value={props?.tutorData?.number_of_student}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Content>
      <Modal
        title="Enter Fee For Teaching Students at home"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        okText="Send"
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            layout="vertical"
            label=" Enter Fee"
            name="noOfstudents"
            rules={[
              { required: true, message: "Fee is required" },
              {
                pattern: /^[0-9]\d/,
                message: "Enter valid  number",
              },
            ]}
          >
            <Input name="noOfstudent" onChange={handleFee} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

function SettingItem({ label, icon }) {
  return (
    <Space style={{ justifyContent: "space-between", width: "100%" }}>
      <Text>
        {icon}
        {+" " + label}
      </Text>
      {/* <Switch defaultChecked={defaultChecked} /> */}
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
