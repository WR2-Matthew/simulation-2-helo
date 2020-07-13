module.exports = {
  getAllPosts: async (req, res) => {
    const db = req.app.get('db')

    const posts = await db.get_all_posts()
    res.status(200).send(posts)
  },

  getPostsIf: async (req, res) => {
    const { userposts, search } = req.query;
    const { id } = req.params;
    const db = req.app.get('db');
    const posts = await db.get_all_posts();

    if (userposts == 'true' && search) {
      const result = await db.userpost_and_search(search, id)
      console.log('hit line 17 true true')
      res.status(200).send(result)
    }
    else if (userposts == 'false' && !search) {
      console.log('hit 21 false false')
      res.status(200).send(posts)
    }
    else if (userposts == 'false' && search) {
      const searchedPosts = await db.contains_search(search)
      console.log('hit 26 false and true')
      res.status(200).send(searchedPosts)
    }
    else if (userposts == 'true' && !search) {
      const usersPosts = await db.users_posts(id)
      console.log('hit 31 true false')
      res.status(200).send(usersPosts)
    };
  },

  singlePost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');

    const single = await db.get_single_post(id)
    res.status(200).send(single)
  },

  createPost: async (req, res) => {
    const { id } = req.params;
    const { title, image, details } = req.body;
    const db = req.app.get('db')

    const created = await db.create_post(title, image, details, id)
    res.status(200).send(created)
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db')

    await db.delete_post(id)
    res.status(200).send('Post has successfully been deleted!')
  }

}