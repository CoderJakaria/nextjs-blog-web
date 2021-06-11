import React from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";

const SinglePostPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export const getStaticProps = context => {
  const {
    params: { slug },
  } = context;

  const postData = getPostData(slug);

  return {
    props: { post: postData },
    revalidate: 30,
  };
};

export const getStaticPaths = () => {
  const postsFileNames = getPostsFiles();
  const slugs = postsFileNames.map(fileName => fileName.replace(/\.md$/, ""));

  const paths = slugs.map(slug => ({
    params: { slug: slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default SinglePostPage;
