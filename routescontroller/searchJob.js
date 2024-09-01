const axios = require("axios");
module.exports.searchJobs = async (req, res, next) => {

    let title = req.query.jobtitle;
    let location = req.query.location;

    if(!title){
        req.flash("error", "Unable to read data, please try again.");
        return res.redirect("/JobHelper");
    }else{
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
        res.render("./listings/jobIndex.ejs", { jobs });
    }
};
