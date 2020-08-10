const Router = require("express").Router();
const { ensureAuthenticated } = require("./services/Helper");
const CompanyModel = require("../models/Company.model");
const JoinUsModel = require("../models/Join_us.model");

Router.get("/", (req, res, next) => {
    res.render("Home", { data: null });
});

Router.get("/join-us", (req, res, next) => {
    res.render("Join_Us");
});

Router.post("/join-us", (req, res, next) => {
    new JoinUsModel(req.body).save((err, doc) => {
        if (err)
            res.render("Join_Us", { error_msg: "Error" });
        else
            res.render("Join_Us", { success_msg: "Your query has been registered!" })
    });
});

Router.get("/search", ensureAuthenticated, (req, res, next) => {
    res.render("Search", { data: null });
});

Router.post("/search", ensureAuthenticated, async (req, res) => {
    let { country, city, pageNo } = req.body;
    const size = 25;
    if (req.user[country] !== undefined) {
        const data = await CompanyModel.find({ Location: city })
            .limit(size)
            .skip(size * parseInt(pageNo) - size);

        const TotalDocuments = await CompanyModel.countDocuments({ Location: city });
        let EndPage = Math.ceil(TotalDocuments / size);
        EndPage = EndPage == 0 ? 1 : EndPage;

        res.json({ data, pageNo, EndPage });
    } else {
        res.json({ data: `Please subscribe to view the data of ${country}` });
    }
});



module.exports = Router;
