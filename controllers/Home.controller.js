const Router = require("express").Router();
const { ensureAuthenticated } = require("./services/Helper");
const CompanyModel = require("../models/Company.model");
const fetch = require('node-fetch')
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

Router.post('/getcity',async (req,res) => {
    const {pageNo , country} = req.body
    const skip = 20 * parseInt(pageNo) - 20
    const where = encodeURIComponent(JSON.stringify({
        "name": {
          "$exists": true
        },
        "location": {
          "$exists": true
        }
      }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_City?skip=${skip}&limit=20&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'O2vzrpsGSLsowbVpQRUSoI4w1gcZn5Ev5OaES8lK', // This is your app's application id
            'X-Parse-REST-API-Key': '2VaBHOKZCSIqoQBqiDXe9U0rrKbyBhdVPVbwBXbV', // This is your app's REST API key
          }
        }
      );
      const data = await response.json(); // Here you have the data that you need
      console.log(JSON.stringify(data, null, 2));
    }); 

module.exports = Router;
