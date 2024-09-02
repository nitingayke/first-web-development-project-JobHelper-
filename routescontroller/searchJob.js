const axios = require("axios");
module.exports.searchJobs = async (req, res, next) => {

    let title = req.query.jobtitle;
    let location = req.query.location;

    if (!title) {
        req.flash("error", "Unable to read data, please try again.");
        return res.redirect("/JobHelper");
    } else {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/estimated-salary',
            params: {
                job_title: title,
                location: (location || "india"),
                radius: '500',
                page: 5, // Start page
                limit: 15,
            },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        };
        const jobs = await axios.request(options);
        return res.render("./listings/jobIndex.ejs", { jobs });
    }
};

module.exports.newPostedJob = async (req, res, next) => {

    const options = {
        method: 'GET',
        url: `https://api.adzuna.com/v1/api/jobs/in/search/1`,
        params: {
            app_id: process.env.ADZUNA_API_ID,
            app_key: process.env.ADZUNA_API_KEY,
            results_per_page: 20,
            what: '', 
            where: 'India'
        }
    };
    
    const response = await axios.request(options);
    
    if (response.data.results ) {
        return res.render("./listings/newPostedJobs.ejs", {jobs: response.data.results});
    }else{
        req.flash("error", "Unable to reach the API, cannot get response.");
        return res.redirect("/JobHelper");
    }
};