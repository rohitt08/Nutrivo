require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");
const connectDb = require("./config/db");

const app = express();
const httpServer = http.createServer(app);

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:3000";
const io = new Server(httpServer, {
	cors: {
		origin: allowedOrigin,
		methods: ["GET", "POST", "PUT", "DELETE"],
	},
});

app.set("io", io);

io.on("connection", () => {
	// Client connection established for live menu updates.
});

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => res.send("<h1>FoodNest API</h1>"));

const PORT = process.env.PORT || 8080;

const startServer = async () => {
	try {
		await connectDb();
		httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.log("Server startup failed:", error.message);
		process.exit(1);
	}
};

startServer();
