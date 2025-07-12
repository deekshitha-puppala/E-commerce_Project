const express = require("express");
const path = require("path");
const rootRouter = require("./routes/routeIndex");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correct static file serving with logging
app.use("/uploadedImages", (req, res, next) => {
    console.log("Requested image:", req.url);
    next();
}, express.static(path.join(__dirname, "public/uploadedImages"))); // Correct path

app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
