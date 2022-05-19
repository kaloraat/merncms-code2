import { useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";

const { Title } = Typography;

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Head>
      <Row gutter={12}>
        <Col xm={24} xl={16}>
          <Card
            cover={
              <img
                src={post?.featuredImage?.url || "/images/default.jpeg"}
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              / in{" "}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>

            <Editor
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
            />
          </Card>
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
