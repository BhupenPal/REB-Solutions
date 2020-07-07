const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')
const UserModel = require('../models/User.model')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const ADMIN = {
  Email: process.env.ADMIN_EMAIL || 'Test',
  Password: process.env.ADMIN_PASS || 'Password'
}

module.exports = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    cookieName: process.env.COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.COOKIE_PASS || 'supersecret-long-password',
    authenticate: async (Email, Password) => {
      if (Email === ADMIN.Email && Password === ADMIN.Password) {
        return ADMIN
      }
      return null
    }
  },
  null,
  {
    resave: false,
    saveUninitialized: true
  }
)