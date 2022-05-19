import { useContext, useState, useEffect } from "react";
import { Layout, Row, Col, Input, Select } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";

const { Option } = Select;
const { Content, Sider } = Layout;

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
