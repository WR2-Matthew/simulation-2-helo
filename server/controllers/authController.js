const bcrypt = require('bcryptjs');

module.exports = {
  registerUser: async (req, res) => {
    console.log('hit')
    const db = req.app.get('db');
    const { username, password } = req.body;
    const profilePicture = `https://robohash.org/${username}`;

    const userCheck = await db.get_username_exists(username)
    if (userCheck[0]) {
      res.status(409).status('Username already exists')
    }

    const salt = bcrypt.genSaltSync(15)
    const hash = bcrypt.hashSync(password, salt)

    const registered = await db.register_user(username, hash, profilePicture);
    const user = registered[0]
    console.log(user, 'user')
    req.session.user = {
      username: user.username,
      profilePicture: user.profile_picture,
      id: user.id
    }

    res.status(201).send(req.session.user)
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body
    const db = req.app.get('db');
    console.log('hit')
    const userCheck = await db.get_username_exists(username)
    const user = userCheck[0]

    if (!user) {
      res.status(404).send('Username does not exist')
    }

    const authenticated = bcrypt.compareSync(password, user.password)
    if (!authenticated) {
      res.status(403).send('Password does not match. Please try again')
    }

    req.session.user = {
      username: user.username,
      profilePicture: user.profile_picture,
      id: user.id
    }

    res.status(200).send(req.session.user)
  }
};