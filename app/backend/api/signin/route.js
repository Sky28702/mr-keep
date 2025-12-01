import connectdb from "../../db/dbConnect";
import User from "../models/user";
import bcrypt from "bcryptjs";
export async function POST(req) {
  await connectdb();
  const data = await req.json();

  try {
    // checking userName
    const isUserExist = await User.findOne({
      userName: data.userName,
    });

    if (!isUserExist) {
      return Response.json({
        success: false,
        message: "inncorret credintals",
      });
    }

    // checking password of data pass and user s pass
    const isPasswordMatched = await bcrypt.compare(
      data.password,
      isUserExist.password
    );

    if (isPasswordMatched) {
      return Response.json({
        success: true,
        message: "Login successfull !",
        user: {
          userName: isUserExist.userName,
          id: isUserExist._id.toString(),
          firstName: isUserExist.firstName,
          lastName: isUserExist.lastName,
          image: isUserExist.image,
        },
      });
    } else {
      return Response.json({
        success: false,
        message: "Incorrect credintals",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
