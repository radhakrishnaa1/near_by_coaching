import React, { useState } from 'react';
import { Upload, message } from 'antd';

const App = () => {
  const [fileList, setFileList] = useState([
   
  ]);

  const onChange = ({ fileList: newFileList }) => {
    // Keep only the latest file (single upload)
    setFileList(newFileList.slice(-1));
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
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

  const beforeUpload = file => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <Upload
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
       listType="picture-circle"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
      beforeUpload={beforeUpload}
      maxCount={1} // ensures only one file
      style={{justifyContent: 'center', alignItems: 'center'}}
    >
      {fileList.length >= 1 ? null : '+ Upload'}
    </Upload>
  );
};

export default App;
