import { useContext, useState } from "react";
import { Layout, Row, Col, Input } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../../context/theme";

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
        </Col>

        <Col span={6} offset={1}>
          Sidebar
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
