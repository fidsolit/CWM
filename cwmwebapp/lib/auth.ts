import jwt from "jsonwebtoken";

interface JwtPayload {
  role: string;
  [key: string]: any;
}

export const verifyToken = async (
  token: string
): Promise<JwtPayload | null> => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
