import React from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";

const PostsPage = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials posts!"
        />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
    revalidate: 30,
  };
};

export default PostsPage;
