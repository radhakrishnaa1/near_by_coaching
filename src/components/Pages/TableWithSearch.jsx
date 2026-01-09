import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { INSTITUTE_DETAILS } from "../../constants/Routes";

const App = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const navigate = useNavigate();
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Institute Name",
      dataIndex: "institute_name",
      key: "institute_name",
      ...getColumnSearchProps("institute_name"),
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "add",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Contact Details",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "State/City",

      key: "status",
      render: (text, record) => (
        <div>
          {record.state_name} / {record.city_name}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleClick(record.institute_id)}
          danger
        >
          View Courses
        </Button>
      ),
    },
  ];

  const handleClick = (institute_id) => {
    console.log("clicked", institute_id);
    navigate(INSTITUTE_DETAILS + "/" + institute_id);
  };

  //   const columns = [
  //     {
  //       title: "Name",
  //       dataIndex: "name",
  //       key: "name",
  //       width: "30%",
  //       ...getColumnSearchProps("name"),
  //     },
  //     {
  //       title: "Age",
  //       dataIndex: "age",
  //       key: "age",
  //       width: "20%",
  //       ...getColumnSearchProps("age"),
  //     },
  //     {
  //       title: "Address",
  //       dataIndex: "address",
  //       key: "address",
  //       ...getColumnSearchProps("address"),
  //       sorter: (a, b) => a.address.length - b.address.length,
  //       sortDirections: ["descend", "ascend"],
  //     },
  //   ];
  return <Table columns={columns} dataSource={props?.instituteList} />;
};
export default App;
