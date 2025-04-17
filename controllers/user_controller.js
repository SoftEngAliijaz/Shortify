const User = require("../models/user");
const { setUser } = require("../services/authService");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    if (!newUser) return res.render("error404");
    return res.render("home");
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).render("error404");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    console.log("Invalid credentials");
    return res.render("error404");
  }

  const token = setUser(user);
  res.cookie("uid", token);
  console.log("User logged in:", user);
  return res.redirect("/");
}

async function handleUserLogOut(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).render("error404");
    }
    res.clearCookie("uid"); // Clear session cookie
    res.redirect("/login");
  });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogOut,
};
