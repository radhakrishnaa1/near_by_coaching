import React from "react";
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
} from "antd";
import {
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const conversations = [
  { name: "Sophie B.", message: "Hi! I need more information..." },
  { name: "Anne Marie", message: "Awesome work, can you..." },
  { name: "Ivanna", message: "About files I can..." },
  { name: "Peterson", message: "Have a great afternoon..." },
  { name: "Nick Daniel", message: "Hi! I need more information..." },
];

export default function ProfilePage() {
  return (
    <Layout style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        {/* Header */}
        <Card style={{ marginBottom: 24 }}>
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Space>
              <Avatar size={64} src="https://i.pravatar.cc/150?img=3" />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Richard Davis
                </Title>
                <Text type="secondary">CEO / Co-Founder</Text>
              </div>
            </Space>

            <Space>
              <Button icon={<HomeOutlined />}>App</Button>
              <Button icon={<MailOutlined />}>Message</Button>
              <Button icon={<SettingOutlined />}>Settings</Button>
            </Space>
          </Space>
        </Card>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: 24,
          }}
        >
          {/* Platform Settings */}
          <Card title="Platform Settings">
            <Title level={5}>Account</Title>

            <Space direction="vertical" style={{ width: "100%" }}>
              <SettingItem label="Email me when someone follows me" />
              <SettingItem label="Email me when someone answers on my post" />
              <SettingItem label="Email me when someone mentions me" />
            </Space>

            <Divider />

            <Title level={5}>Application</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <SettingItem label="New launches and projects" />
              <SettingItem label="Monthly product updates" defaultChecked />
              <SettingItem label="Subscribe to newsletter" />
            </Space>
          </Card>

          {/* Profile Information */}
          <Card title="Profile Information">
            <Paragraph type="secondary">
              Hi, I'm Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </Paragraph>

            <Divider />

            <ProfileRow label="Full Name" value="Alec M. Thompson" />
            <ProfileRow label="Mobile" value="(44) 123 1234 123" />
            <ProfileRow label="Email" value="alecthompson@mail.com" />
            <ProfileRow label="Location" value="USA" />

            <Divider />

            <Space>
              <Text strong>Social:</Text>
              <FacebookFilled />
              <TwitterOutlined />
              <InstagramOutlined />
            </Space>
          </Card>

          {/* Conversations */}
          <Card title="Conversations">
            <List
              itemLayout="horizontal"
              dataSource={conversations}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" key="reply">
                      Reply
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${item.name}`}
                      />
                    }
                    title={item.name}
                    description={item.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}

function SettingItem({ label, defaultChecked = false }) {
  return (
    <Space style={{ justifyContent: "space-between", width: "100%" }}>
      <Text>{label}</Text>
      <Switch defaultChecked={defaultChecked} />
    </Space>
  );
}

function ProfileRow({ label, value }) {
  return (
    <Space style={{ marginBottom: 8 }}>
      <Text strong>{label}:</Text>
      <Text type="secondary">{value}</Text>
    </Space>
  );
}
