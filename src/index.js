const express = require("express");
const app = express();



app.use("/api", require("../routes/blogs.js"));

app.get("/", async (req, res) => {
    res.send("This is home route");
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});