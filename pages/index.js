import React from "react";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

const HomePage = ({ featuredPosts }) => {
  console.log(featuredPosts);
  return (
    <>
      <Head>
        <title>Coder's Blog</title>
        <meta
          name="description"
          content="I post about programming and web development. Iam also a javascript developer and react developer"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: { featuredPosts },
    revalidate: 30,
  };
};

export default HomePage;
