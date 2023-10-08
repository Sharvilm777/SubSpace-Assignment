const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use("/api", require("../routes/blogs.js"));

app.get("/", async (req, res) => {
    res.send("Hello,I'm Sharvil \n Completed This Assignment\n I'm looking forward to this internship opportunity.\nThank You");
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});