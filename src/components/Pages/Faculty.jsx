import React from "react";
import { Table, Divider, Tag, Row, Col } from "antd";

import AuthLayout from "../Layouts/AuthLayout";
import BranchInfo from "./BranchInfo";
import Teacherdetails from "./Teacherdetail";
import { Avatar, List, Typography } from "antd";
const { Title } = Typography;
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const App = (props) => {
  React.useEffect(() => {
    // props.handleSpinner();
  }, []);

  return (
    <AuthLayout>
      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Title
              level={3}
              style={{
                textAlign: "center",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              List Of Faculties
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />{" "}
                  <List.Item
                    actions={[
                      <a key="list-loadmore-edit">edit</a>,
                      <a key="list-loadmore-more">more</a>,
                    ]}
                  ></List.Item>
                </List.Item>
              )}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            style={{ borderLeft: "1px solid #f5f5f5d3", paddingLeft: "20px" }}
          >
            <Teacherdetails />
          </Col>
        </Row>
      </div>
    </AuthLayout>
  );
};
export default App;
