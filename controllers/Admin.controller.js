const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");

const mongoose = require("mongoose");
const UserModel = require("../models/User.model");
const CompanyModel = require("../models/Company.model");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [
    {
      resource: UserModel,
      options: { parent: { name: "Users" } }
    },
    {
      resource: CompanyModel,
      options: { parent: { name: "Companies" } }
    }
  ],
  rootPath: "/admin",
  branding: {
    logo: "../assets/images/icons/logo.png",
    companyName: "REB Solutions",
    favicon: "../assets/images/icons/logo.png",
    softwareBrothers: false,
  },
  dashboard: {
    component: AdminBro.bundle("./services/Dashboard.tsx"),
  },
});

const ADMIN = {
  Email: process.env.ADMIN_EMAIL || "Test",
  Password: process.env.ADMIN_PASS || "Password",
};

module.exports = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    cookieName: process.env.COOKIE_NAME || "admin-bro",
    cookiePassword: process.env.COOKIE_PASS || "supersecret-long-password",
    authenticate: async (Email, Password) => {
      if (Email === ADMIN.Email && Password === ADMIN.Password) {
        return ADMIN;
      }
      return null;
    },
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);
