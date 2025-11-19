import UserData from "../model/users.js";

const getAllUsersList = async (req, res) => {
  console.log("Entered");
  const users = await UserData.find();
  if (!users) return res.json({ message: "No user data found!" });
  console.log("user data", users);
  res.json(users);
};

const addNewUsers = (req, res) => {
  console.log(req.query);
  const username = req.query?.name ? req.query.name : null;
  if (!username) return res.json({ message: "Username is required!" });
          res.json({ "message" : "User Added", username });
};

export default {
  getAllUsersList,
  addNewUsers,
};
