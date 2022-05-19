import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import AdminNav from "../nav/AdminNav";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

function AdminLayout({ children }) {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // hooks
  const router = useRouter();

  useEffect(() => {
    if (auth?.user?.role !== "Admin") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "50px",
          color: "red",
        }}
      />
    );
  }

  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
