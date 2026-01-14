import React from "react";
import { Row, Col, Card, Typography, Select, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import PurchaseCourse from "./PurchaseCourse";
import CourseDetails from "./CourseDetails";
import axios from "axios";
import Swal from "sweetalert2";
import PurchaseCourseInside from "./PurchaseCourseInside";
const { Title, Text } = Typography;
const { Option } = Select;

// const courses = [
//   {
//     id: 1,
//     title:
//       "Bihar B.Ed. 4-year Integrated Course 2025 Common Entrance Exam (CET-BED)",
//     language: "Hinglish",
//     type: "Video Course",
//     videos: "219 Videos",
//     price: "₹3996",
//     offer: "Offers Available",
//     image:
//       "https://st.adda247.com/https://storeimages.adda247.com/941621760351293.png?tr=w-undefined", // replace with real image
//   },
// ];

const Courses = (props) => {
  const [coursesList, setCoursesList] = React.useState([]);
  const [courseSelected, setCourseSelected] = React.useState(null);
  const params = useParams();
  const studentId = sessionStorage.getItem("userId");
  console.log("userid", studentId);
  React.useEffect(() => {
    // Fetch courses from API if needed
    getCourseList();
  }, [props.instituteId]);

  const getCourseList = () => {
    const instituteId = params.id ? params.id : props.instituteId;
    props.handleSpinner(true);
    axios({
      method: "get",
      url: `http://localhost:3004/getCourseData/${instituteId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setCoursesList(response.data);
        Swal.close();
      })
      .catch(() => {});
  };

  const handleCourseselect = (data) => {
    console.log("Selected course ID:", data);
    setCourseSelected(data);
    // Implement further actions based on selected course
  };

  return (
    <div style={{ padding: "40px" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3}>Courses Offered by Our Institute</Title>
        <Select defaultValue="Relevance" style={{ width: 150 }}>
          <Option value="Relevance">Relevance</Option>
          <Option value="PriceLow">Price: Low to High</Option>
          <Option value="PriceHigh">Price: High to Low</Option>
        </Select>
      </Row>

      <Row gutter={[24, 24]}>
        {coursesList.map((course, id) => (
          <Col xs={24} sm={12} md={12} lg={6} key={id}>
            <Card
              hoverable
              cover={
                <img
                  alt={"image Loading"}
                  src="https://st.adda247.com/https://storeimages.adda247.com/941621760351293.png?tr=w-undefined"
                  style={{
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
              }
              onClick={() => handleCourseselect(course)}
              actions={[<HeartOutlined key="like" />]}
            >
              <div style={{ marginBottom: 8 }}>
                <Text type="secondary">{course.course_medium}</Text>
                <Text style={{ marginLeft: 10 }} type="secondary">
                  {course.course_details}
                </Text>
              </div>
              <Title level={5} ellipsis={{ rows: 2 }}>
                {course.course_name}
              </Title>
              <Text type="secondary">{course.videos}</Text>
              <div style={{ marginTop: 10 }}>
                <Title level={4} style={{ margin: 0 }}>
                  {course.course_fee}
                </Title>
                <Text type="success">{course.course_duraton}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {courseSelected ? (
        <div style={{ margin: "auto", width: "95%" }}>
          <Row gutter={16}>
            <Col span={12}>
              <CourseDetails viewCourseDetails={courseSelected} />
            </Col>

            <Col span={12}>
              {studentId ? (
                <PurchaseCourseInside
                  handleSpinner={props.handleSpinner}
                  instituteId={props?.instituteId}
                  courseId={courseSelected?.courseid}
                  courseFee={courseSelected?.course_fee}
                />
              ) : (
                <PurchaseCourse
                  handleSpinner={props.handleSpinner}
                  instituteId={props?.instituteId}
                  courseId={courseSelected?.courseid}
                  courseFee={courseSelected?.course_fee}
                  discount={courseSelected?.discount}
                />
              )}
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
};

export default Courses;

// course_details
// :
// null
// course_duraton
// :
// "6 month"
// course_fee
// :
// "4000"
// course_medium
// :
// "hi"
// course_name
// :
// "PCM 12  Hindi"
// courseid
// :
// 1
// creation_date
// :
// "2015-12-07T18:30:00.000Z"
// discount
// :
// "nill"
// end_date
// :
// "2026-06-29T18:30:00.000Z"
// max_student
// :
// null
// mode
// :
// "online"
// start_date
// :
// "2025-12-31T18:30:00.000Z"
// status
// :
// "upcomming"
// timing
// :
// "6pm"
