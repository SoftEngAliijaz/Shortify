const { v4: uuidV4 } = require("uuid");
const User = require("../models/user");

const { setUser } = require("../services/authService");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
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
    return res.render("error404");
  }

  const sessionId = uuidV4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.render("home");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
