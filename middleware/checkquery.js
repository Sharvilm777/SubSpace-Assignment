
const checkQuery = (req, res, next) => {
    try {
        const query = req.query.query;
        if (query === "") return res.status(403).json({ error: "Query cant be empty.Please provide valid query to search" })
        else next();
    } catch (error) {
        return res.status(500).json({ error })
    }

}

module.exports = checkQuery