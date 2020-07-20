const Router = require("express").Router();
const { ensureAuthenticated } = require("./services/Helper");
const CompanyModel = require("../models/Company.model");

Router.get("/", (req, res, next) => {
    res.render("Home", { data: null });
});

Router.get("/join-us", (req, res, next) => {
    res.send("Join Us");
});

Router.get("/search", ensureAuthenticated , (req, res, next) => {
    res.render("Search", { data: null });
});

Router.post("/search", ensureAuthenticated, async (req, res) => {
    let { country, city, pageNo } = req.body;
    const size = 25;
    console.log(size * parseInt(pageNo) - size,pageNo)
    if (req.user[country] !== undefined) {
        const data = await CompanyModel.find({ Location: city })
            .limit(size)
            .skip(size * parseInt(pageNo) - size);
        res.json({ data, pageNo });
        // data = JSON.parse(data)
        // pageNo = JSON.parse(pageNo)
        // res.render('Search', {data : res.json({data,pageNo}) , })
    } else {
        res.json({ data: `Please subscribe to view the data of ${country}` });
    }
});

module.exports = Router;
