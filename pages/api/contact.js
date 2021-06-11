import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() == "" ||
      !message ||
      message.trim() == ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    console.log(newMessage);

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.dim1c.mongodb.net/${process.env.mongodb_databaseKey}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (err) {
      res.status(500).json({ messsage: "Could not connect to database" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Storing messasge failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored", message: newMessage });
  }
};

export default handler;
