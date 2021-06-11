import { useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";

const sendContactData = async contactDetails => {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requstStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requstStatus === "success" || requstStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requstStatus]);

  const sendMessageHandler = async event => {
    event.preventDefault();

    // Optional : add client-side validation

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (err) {
      setRequestError(err.message);
      setRequestStatus("error");
    }
  };

  let notification;

  if (requstStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your messsage is on its way!",
    };
  }

  if (requstStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requstStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can i help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={e => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={e => setEnteredName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="messsge">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={enteredMessage}
            onChange={e => setEnteredMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.actions}>
          <button>Send Messassge</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
