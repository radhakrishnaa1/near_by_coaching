import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </div>
  );
};
export default App;

// {
//         "purchase_id": 4,
//         "student_id": null,
//         "purchase_date": "2026-01-06T18:30:00.000Z",
//         "fee_paid": 3000,
//         "courseid": 6,
//         "course_name": "Aws cloud",
//         "course_duraton": "6mon",
//         "course_fee": "3000",
//         "status": "upcoming",
//         "mode": "2",
//         "timing": "6am",
//         "course_medium": "1",
//         "start_date": "2025-12-30T18:30:00.000Z",
//         "end_date": "2026-06-22T18:30:00.000Z",
//         "discount": "0"
//     }
