const express = require('express');
const router = express.Router();
const lodash = require('lodash')
const getData = require('../middleware/blog-stats');
const checkQuery = require('../middleware/checkquery');
const { dataForSearch, blogAnalytics, searchQueryFunction } = require('../helpers/helpers');


router.get("/blog-stats", getData, async (req, res) => {
    try {
        const blog_data = req.blog_data;

        //Data fetching by normal blogAnalytics function
        // const stats_data = blogAnalytics(blog_data);

        //Data fetching by memoized function of lodash
        const memoizedBlogAnalytics = lodash.memoize(blogAnalytics);
        const stats_data = memoizedBlogAnalytics(blog_data);
        return res.status(200).json(stats_data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

})

router.get("/blog-search", checkQuery, async (req, res) => {
    try {
        const queryString = req.query.query.toLowerCase();
        const data = await dataForSearch();

        //Searching a query String
        // const queryResult = searchQueryFunction(queryString, data);

        //Searching the query string with memoized function
        const memoizedSerachFunction = lodash.memoize(searchQueryFunction);
        const queryResult = memoizedSerachFunction(queryString, data)

        return res.status(200).json({ queryResult });
    } catch (error) {
        return res.status(500).json({ error });
    };
})

module.exports = router