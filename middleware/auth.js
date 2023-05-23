import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    if (!token) {
      return res.status(401).json("You are not authenticated!");
    } else {
      if (token) {
        decodedData = await jwt.verify(token, secret);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed" });
  }
};

export default auth;
