import jwt from "jsonwebtoken";
import { JTW_SECRET } from "../utils/constants";
const generateId = () => {
	return Date.now().toString(32) + Math.random().toString(36).substring(2);
};

const generateJwt = (payload: number) => {
	return jwt.sign(
		{
			id: payload,
		},
		JTW_SECRET,
		{
			expiresIn: "1h",
		}
	);
};

export { generateId, generateJwt };
