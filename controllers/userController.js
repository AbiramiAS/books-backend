import UserData from "../model/users.js";

const getAllUsersList = async (req, res) => {
  console.log("Entered");
  const users = await UserData.find();
  if (!users) return res.json({ message: "No user data found!" });
  console.log("user data", users);
  res.json(users);
};

const addNewUsers = async (req, res) => {
  const userQuery = req.query ? req.query : req.body;
  const username = userQuery?.name ? userQuery.name : null;
  if (!username) return res.json({ message: "Username is required!" });
  const existingUser = await UserData.findOne({ name: username }).exec();
  //Avoid duplicates in adding user
  if (!existingUser) {
    const addUser = await UserData.create({
      name: userQuery.name,
      username: userQuery?.username,
      email: userQuery?.email,
      phone: userQuery?.phone,
      company: {
        name: userQuery?.company_name,
        website: userQuery?.company_website,
        address: userQuery?.company_address,
      },
    });

    res.json({ message: "User Added", "User Name": addUser });
  } else {
    res.json({ message: "User name already exists" });
  }
};

const updateUserDetails = async (req, res) => {
  const userQuery = req.query ? req.query : req.body;
  const name = userQuery?.name ? userQuery.name : null;
  if (!name) return res.json({ message: "Username is required!" });
  const existingUser = await UserData.findOne({ name: name }).exec();
  //check for user in DB
  if (!existingUser) return res.status(204).json({ message: "No user data found!" });
  //updating all data of corresponding user
  if (userQuery.name) existingUser.name = userQuery.name;
  if (userQuery.username) existingUser.username = userQuery.username;
  if (userQuery.email) existingUser.email = userQuery.email;
  if (userQuery.phone) existingUser.phone = userQuery.phone;
  if (userQuery.company_name)
    existingUser.company.name = userQuery.company_name;
  if (userQuery.company_website)
    existingUser.company.website = userQuery.company_website;
  if (userQuery.company_address)
    existingUser.company.address = userQuery.company_address;
  // Updating DB
  const result = await existingUser.save();

  res.json({
    message: "User details updated successfully",
    User_Details: result,
  });
};
export default {
  getAllUsersList,
  addNewUsers,
  updateUserDetails,
};
