const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signToken = (user) =>
	jwt.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECRET || "foodnest-dev-secret",
		{ expiresIn: "7d" }
	);

const sanitizeUser = (userDoc) => {
	const user = userDoc.toObject ? userDoc.toObject() : userDoc;
	delete user.password;
	return user;
};

const registerController = async (req, res) => {
	try {
		const { userName, name, email, password } = req.body;
		const resolvedName = (userName || name || "").trim();
		const normalizedEmail = (email || "").trim().toLowerCase();

		if (!resolvedName || !normalizedEmail || !password) {
			return res.status(400).send({ success: false, message: "Name, email and password are required" });
		}

		if (password.length < 6) {
			return res.status(400).send({ success: false, message: "Password must be at least 6 characters" });
		}

		const user = await userModel.findOne({ email: normalizedEmail });
		if (user) {
			return res.status(400).send({ success: false, message: "Email already registered. Please login." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await userModel.create({
			userName: resolvedName,
			name: resolvedName,
			email: normalizedEmail,
			password: hashedPassword,
		});

		const token = signToken(newUser);
		res.status(201).send({ success: true, message: "Registered successfully", token, user: sanitizeUser(newUser) });
	} catch (error) {
		res.status(500).send({ success: false, message: "Registration failed", error: error.message });
	}
};

const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const normalizedEmail = (email || "").trim().toLowerCase();

		if (!normalizedEmail || !password) {
			return res.status(400).send({ success: false, message: "Email and password required" });
		}

		const user = await userModel.findOne({ email: normalizedEmail });
		if (!user) {
			return res.status(400).send({ success: false, message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send({ success: false, message: "Invalid credentials" });
		}

		const token = signToken(user);
		res.status(200).send({ success: true, message: "Login successful", token, user: sanitizeUser(user) });
	} catch (error) {
		res.status(500).send({ success: false, message: "Login failed", error: error.message });
	}
};

const meController = async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			return res.status(401).send({ success: false, message: "Unauthorized" });
		}

		const user = await userModel.findById(userId).select("-password");
		if (!user) {
			return res.status(404).send({ success: false, message: "User not found" });
		}

		res.status(200).send({ success: true, user: sanitizeUser(user) });
	} catch (error) {
		res.status(500).send({ success: false, message: "Unable to fetch profile", error: error.message });
	}
};

module.exports = { registerController, loginController, meController };
