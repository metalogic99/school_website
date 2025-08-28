import Admin from "@/server/models/Admin";
import connectDB from "@/server/utils/connectDB";
import bcrypt from "bcryptjs";

export const registerAdmin = async (username: string, password: string) => {
  await connectDB();
  //   const { phone, username, address, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ username });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists, please choose a different username",
      };
    }

    if (password.length < 8) {
      return {
        message: "Password must be at least 8 characters long",
        success: false,
      };
    }
    //Hashing the password 10 times
    const hash = await bcrypt.hash(password, 10);

    const user = await Admin.create({
      username,
      password: hash,
    });

    return {
      message: "Admin created successfully !!",
      user: user._id,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred while creating a user",
      success: false,
    };
  }
};

registerAdmin("admin", "admin123")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
