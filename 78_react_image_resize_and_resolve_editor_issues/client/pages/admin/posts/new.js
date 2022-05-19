import { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, Input, Select } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const { Option } = Select;
const { Content, Sider } = Layout;

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const uploadImage = async (file) => {
  // console.log(file);
  try {
    const image = await resizeFile(file);
    console.log("IMAGE BASE64 => ", image);
    return;
    const { data } = await axios.post("/upload-image", { image });
    console.log("UPLOAD FILE RESPONSE => ", data);
    return data.url;
  } catch (err) {
    console.log(err);
  }
};

function NewPost() {
  // load from local storage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-title")) {
        return JSON.parse(localStorage.getItem("post-title"));
      }
    }
  };
  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem("post-content")) {
        return JSON.parse(localStorage.getItem("post-content"));
      }
    }
  };
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  // state
  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create new post</h1>
          <Input
            size="large"
            value={title}
            placeholder="Give your post a title"
            onChange={(e) => {
              setTitle(e.target.value);
              localStorage.setItem(
                "post-title",
                JSON.stringify(e.target.value)
              );
            }}
          />
          <br />
          <br />
          <Editor
            dark={theme === "light" ? false : true}
            defaultValue={content}
            onChange={(v) => {
              setContent(v());
              localStorage.setItem("post-content", JSON.stringify(v()));
            }}
            uploadImage={uploadImage}
          />

          <br />
          <br />

          <pre>{JSON.stringify(loadedCategories, null, 4)}</pre>
        </Col>

        <Col span={6} offset={1}>
          <h4>Categories</h4>

          <Select
            mode="multiple"
            allowClear={true}
            placeholder="Select categories"
            style={{ width: "100%" }}
            onChange={(v) => setCategories(v)}
          >
            {loadedCategories.map((item) => (
              <Option key={item.name}>{item.name}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
