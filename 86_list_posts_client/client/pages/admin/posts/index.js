import { useEffect, useState } from "react";
import { Row, Col, Button, List } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    console.log("EDIT POST", post);
  };

  const handleDelete = async (post) => {
    console.log("DELETE POST", post);
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Button type="primary">
            <Link href="/admin/posts/new">
              <a>
                <PlusOutlined /> Add New
              </a>
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>{posts?.length} Posts</h1>
          <List
            itemLayout="horizontal"
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item)}>edit</a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta title={item.title} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Posts;
