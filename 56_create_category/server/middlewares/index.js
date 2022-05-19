import expressJwt from "express-jwt";
require("dotenv").config();
// req.user = _id
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
