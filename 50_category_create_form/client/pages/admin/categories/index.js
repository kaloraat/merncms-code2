import { Layout } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Form, Input, Row, Col, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

function Categories() {
  const onFinish = async (values) => {
    console.log("values => ", values);
  };
  return (
    <AdminLayout>
      <Row>
        {/* first column */}
        <Col span={12}>
          <h1>Categories</h1>
          <p>Add new category</p>

          <Form onFinish={onFinish}>
            <Form.Item name="name">
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Give it a name"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col>
          <p>Show categories list...</p>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Categories;
