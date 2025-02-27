const express = require("express");
const cors = require("cors");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);
// Middleware to handle 404 Error
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung
  // Xử lý lỗi ở đây
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;