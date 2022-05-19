import axios from "axios";
import { Row, Col, Card, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta description="Blog posts about web development, programming etc" />
      </Head>
      <Row gutter={12}>
        <Col xm={24} xl={16}>
          <pre>{JSON.stringify(post, null, 4)}</pre>
        </Col>

        <Col xm={24} xl={8}>
          Sidebar
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
