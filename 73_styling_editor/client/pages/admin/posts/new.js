import { useContext, useState } from "react";
import { Layout, Row, Col } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../../context/theme";

const { Content, Sider } = Layout;

function NewPost() {
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  // state
  const [content, setContent] = useState("");

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create new post</h1>
          <Editor
            dark={theme === "light" ? false : true}
            onChange={(v) => setContent(v())}
          />
          <pre>{JSON.stringify(content, null, 4)}</pre>
        </Col>

        <Col span={6} offset={1}>
          Sidebar
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
