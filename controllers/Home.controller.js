module.exports = {
    getHome: (req, res, next) => {
        res.render("Home")
    },

    getAbout: (req, res, next) => {
        res.render("About")
    }
}