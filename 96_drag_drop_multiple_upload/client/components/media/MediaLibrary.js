import React, { useContext } from "react";
import { Upload, message } from "antd";
import { AuthContext } from "../../context/auth";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const MediaLibrary = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const props = {
    name: "file",
    multiple: true,
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
        console.log("info.file on drag drop => ", info.file);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props} accept="image/*">
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Dragger>
  );
};

export default MediaLibrary;
