const axios = require("axios");
const lodash = require("lodash")


const dataForSearch = async () => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        const blog_data = response.data;
        return blog_data;
    } catch (error) {
        return error.message;

    }

}
const blogAnalytics = (blog_data) => {
    const NoOfBlogs = lodash.size(blog_data.blogs)
    const blogWithLongestTitle = lodash.maxBy(blog_data.blogs, (blog) => blog.title.length);
    const blogsWithPrivacy = lodash.size(lodash.filter(blog_data.blogs, (blog) =>
        blog.title.toLowerCase().includes('privacy')
    ));
    const BlogsWithUniqueTitles = lodash.uniq(blog_data.blogs.map((blog) => blog.title));

    return stats_data = {
        "Total Number of Blogs": NoOfBlogs,
        "The Title of longest Blog": blogWithLongestTitle.title,
        "The blogs with PRIVACY keyoword": blogsWithPrivacy,
        "Array of Unique Blog Titles": BlogsWithUniqueTitles
    }
}

const searchQueryFunction = (queryString, data) => {
    const blogsWithSearchQuery = lodash.filter(data.blogs, (blog) =>
        blog.title.toLowerCase().includes(queryString)
    );
    return blogsWithSearchQuery;
}

module.exports = { dataForSearch, blogAnalytics, searchQueryFunction }