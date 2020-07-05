module.exports = {
    getLogin: (req, res, next) => {
        res.render('Login')
    },

    postLogin: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: req.session.redirectTo || "/",
            failureRedirect: "/users/login",
            failureFlash: true,
        })(req, res, next);
    },

    getRegister: (req, res, next) => {
        res.render('Register')
    },

    postRegister: (req, res, next) => {
        errors = [];
    
        const {
          firstName,
          lastName,
          email,
          phoneNum,
          password,
          password2,
          address,
        } = req.body;
    
        if (!firstName || !lastName || !email || !password || !password2) {
          errors.push({ msg: "Please fill in all fields" });
        }
    
        if (errors.length == 0) {
          PassCheck(password, password2, errors);
        }
    
        if (errors.length > 0) {
          res.render("register", {
            errors,
            firstName,
            lastName,
            email,
            phoneNum,
            password,
            password2,
          });
        } else {
          userModel.findOne({ email: email }).then((user) => {
            if (user) {
              errors.push({ msg: "Email already exists" });
              res.render("register", {
                errors,
                firstName,
                lastName,
                email,
                phoneNum,
                password,
                password2,
                address,
              });
            } else {
              userModel.findOne({ phoneNum: phoneNum }).then((user) => {
                if (user) {
                  errors.push({ msg: "Phone number already exists" });
                  res.render("register", {
                    errors,
                    firstName,
                    lastName,
                    email,
                    phoneNum,
                    password,
                    password2,
                    address,
                  });
                } else {
                  const secretToken = GenerateRandom();
                  const newUser = new userModel({
                    firstName,
                    lastName,
                    phoneNum,
                    email,
                    password,
                    address,
                    secretToken,
                  });
    
                  //Hash Password
                  bcrypt.genSalt(12, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      //Set password to hashed
                      newUser.password = hash;
                      //Save User
                      newUser.save();
                    })
                  );
    
                  let mailOptions = {
                    from: '"HooHoop" <contact@hoohoop.co.nz>', // sender address
                    to: email, // list of receivers
                    subject: "HooHoop Account Verification Email", // Subject line
                    html: verificationMail(firstName, secretToken), // html body
                  };
    
                  // send mail with defined transport object
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return console.log(error);
                    }
                    success_msg = "Email has been sent";
                    res.render("login", { success_msg });
                  });
                }
              });
            }
          });
        }
      },
}