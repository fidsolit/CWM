// import connectDB from "@/DB/connectDB";
// import AuthCheck from "@/middleware/AuthCheck";
// import { NextResponse } from "next/server";
// import Order from "@/models/Order";

// export async function PUT(req: Request) {
//   try {
//     await connectDB();
//     const isAuthenticated = await AuthCheck(req);

//     if (isAuthenticated === "admin") {
//       const data = await req.json();
//       const id = data;
//       console.log("this is the data line 14", data);
//       if (!id)
//         return NextResponse.json({
//           success: false,
//           message: "Please provide the order id!",
//         });

//       const saveData = await Order.findOneAndUpdate(
//         id._id,
//         { isDelivered: true },
//         { new: true }
//       );

//       if (saveData) {
//         return NextResponse.json({
//           success: true,
//           message: "Order status updated successfully!",
//         });
//       } else {
//         return NextResponse.json({
//           success: false,
//           message: "Failed to update the Order status. Please try again!",
//         });
//       }
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "You are not authorized.",
//       });
//     }
//   } catch (error) {
//     console.log("Error in update order status:", error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }

import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Order from "@/models/Order";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === "admin") {
      const body = await req.json(); // Parse the ID properly

      console.log("This is the request JSON:", body);

      if (!body)
        return NextResponse.json({
          success: false,
          message: "Please provide the order id!",
        });
      console.log("ito yong boong body", body);
      const saveData = await Order.findOneAndUpdate(
        { _id: body }, // Ensure it looks for `_id` in the object

        { isDelivered: true },
        { new: true } // Return the updated document
      );

      if (saveData) {
        return NextResponse.json({
          success: true,
          message: "Order status updated successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to update the Order status. Please try again!",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized.",
      });
    }
  } catch (error) {
    console.error("Error in update order status:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
