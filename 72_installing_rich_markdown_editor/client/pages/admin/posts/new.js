import { Layout } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Editor from "rich-markdown-editor";

const { Content, Sider } = Layout;

function NewPost() {
  return (
    <AdminLayout>
      <h1>Create new post</h1>
      <Editor />
    </AdminLayout>
  );
}

export default NewPost;
