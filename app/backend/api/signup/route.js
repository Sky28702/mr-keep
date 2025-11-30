import User from "../../models/user";
import bcrypt from "bcryptjs";
import connectdb from "../../db/dbConnect";

export async function POST(req) {
  try {
    await connectdb();
    const data = await req.json();

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const isEmailAlreadyExist = await User.findOne({
      email: data.email,
    });

    if (isEmailAlreadyExist) {
      return Response.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const isUserAlreadyExist = await User.findOne({
      userName: data.userName,
    });

    if (isUserAlreadyExist) {
      return Response.json({
        success: false,
        message: "Username already taken",
      });
    }

    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
    });
    await user.save();
    return Response.json({
      success: true,
      message: "Registration successful!",
    });

    // *TODO: i am not using form data here so mi8 cause trouble later ve to check on it ok!!!!!!!!!!
  } catch (error) {
    console.log(error);
  }
}
