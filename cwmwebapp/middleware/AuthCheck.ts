import jwt, { JwtPayload } from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthCheck = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECREAT ?? "deafault_secretkey"
    ) as JwtPayload;
    if (decoded) return decoded?.role;
  } catch (error) {
    return false;
  }
};

export default AuthCheck;
