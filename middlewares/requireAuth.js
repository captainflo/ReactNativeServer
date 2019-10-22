const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer jhvfhrjhvj'
  if (!authorization) {
    return res.status(401).send({ error: "You Must be logged in." });
  }

  // Extract token and verify
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You Must be logged in." });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    // When user find assign to req.user
    req.user = user
    next();
  });
};
