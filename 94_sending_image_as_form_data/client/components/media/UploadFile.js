import React, { useContext } from "react";
import { Upload, message, Button } from "antd";
import { AuthContext } from "../../context/auth";
import { UploadOutlined } from "@ant-design/icons";

const UploadFile = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const props = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
