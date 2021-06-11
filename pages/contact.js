import React from "react";
import ContactForm from "../components/contact/contact-form";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta
          name="description"
          content="If want to contact me you can. Sent me your messages."
        />
      </Head>
      <ContactForm />
    </>
  );
};

export default ContactPage;
