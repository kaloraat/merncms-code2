import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { PostProvider } from "../context/post";
// import "antd/dist/antd.css";
// import "antd/dist/antd.dark.css";
import TopNav from "../components/TopNav";
import "../public/css/styles.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostProvider>
          <TopNav />
          <Toaster />
          <Component {...pageProps} />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
