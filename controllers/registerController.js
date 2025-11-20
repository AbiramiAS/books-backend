import registerData from "../model/register.js";
import bcrypt from "bcrypt";

const registerNewUser = async(req, res) => {
  const name = req?.query?.username;
  const pwd = req?.query?.password;

  if (!name || !pwd)
    res.json({ message: "Both Username and Password are mandatory" });
  const hashedPassword = await bcrypt.hash(pwd, 10);
  const existingUser = await registerData.findOne({ username: name }).exec();
  if (!existingUser) {
    const newuser = await registerData.create({
      username: name,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User registered successfully!",
      name: newuser,
    });
  } else {
    res.status(403).json({ message: "Username already exists!" });
  }
};

const signinUser = async(req, res) => {
  const name = req?.query?.username;
  const password = req?.query?.password;

  if(!name || !password) res.json({ message: "Both Username and Password are mandatory" });

  const existingUser = await registerData.findOne({ username: name }).exec();

  if(!existingUser) res.status(403).json({ message: "User not found" });
  
  const matchFound = existingUser
    ? await bcrypt.compare(password, existingUser.password)
    : null;
  if(!matchFound) res.status(401).json("Unauthorized Access");
  if(matchFound)   res.status(200).json({ message: "User Authentication successful!" });

};

export default {
  signinUser,
  registerNewUser,
};
