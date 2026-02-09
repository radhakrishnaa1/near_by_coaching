import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
const App = (props) => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState("");

  const uploadImage = () => {
    console.log(props?.id);
    const formData = new FormData();
    // fileList.forEach(file => {
    //     formData.append('files', file);
    //   });

    formData.append("image", file);

    const id = props?.id;
    if (formData) {
      axios({
        method: "post",
        url: `http://localhost:3004/uploadCourseimage/${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log("response===>", response);
          Swal.fire({
            icon: "success",
            text: "Course image Updated successfully",
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

  const onChange = ({ fileList: newFileList }) => {
    // Keep only the latest file (single upload)
    setFileList(newFileList.slice(-1));
    setFile(newFileList[0].originFileObj);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        maxCount={1} // ensures only one file
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {fileList.length >= 1 ? null : "+ Upload"}
      </Upload>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        {" "}
        <img
          src={"http://localhost:3004/" + props?.image}
          alt="courseimage"
          style={{ width: "100px", height: "100px", marginBottom: "20px" }}
        />
      </div>
      <Button
        style={{ marginBottom: "auto", marginTop: "auto" }}
        type="primary"
        onClick={() => uploadImage()}
      >
        {" "}
        Upload
      </Button>
    </>
  );
};

export default App;
