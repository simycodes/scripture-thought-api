import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authentication invalid" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Token invalid" });
  }
};

export default authenticateUser;
