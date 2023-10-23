import jwt from "jsonwebtoken";

const generateId = () => {
	return Date.now().toString(32) + Math.random().toString(36).substring(2);
};

const generateJwt = (payload: number) => {
	return jwt.sign(
		{
			id: payload,
		},
		"secret",
		{
			expiresIn: "1h",
		}
	);
};

export { generateId, generateJwt };
