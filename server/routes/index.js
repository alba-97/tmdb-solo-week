const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Op } = require("sequelize");

const { Users, Items } = require("../models");
const validateUser = require("../middleware/auth");
const { generateToken, validateToken } = require("../config/tokens");

const { api } = require("../config/config");

router.get("/search/user", (req, res) => {
  let query = req.query.username;
  Users.findAll({
    where: {
      username: {
        [Op.iLike]: `%${query}%`,
      },
    },
    attributes: ["id", "username"],
  })
    .then((data) => res.send(data))
    .catch(() => {
      res.send(404);
    });
});

router.get("/search/movie", (req, res) => {
  let query = req.query.title;
  query = query.replaceAll(" ", "+");
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${query}`
    )
    .then((response) => res.send(response.data.results || []))
    .catch((err) => {
      console.log(err);
      res.send(404);
    });
});

router.get("/search/tv", (req, res) => {
  let query = req.query.title;
  query = query.replaceAll(" ", "+");
  axios
    .get(`https://api.themoviedb.org/3/search/tv?api_key=${api}&query=${query}`)
    .then((response) => res.send(response.data.results || []))
    .catch(() => {
      res.send(404);
    });
});

router.post("/favorites/remove", (req, res) => {
  const { userId, itemId } = req.body;
  let user, item;
  Users.findByPk(userId)
    .then((data) => {
      user = data;
      return Items.findByPk(itemId);
    })
    .then((data) => {
      user.removeItem(data);
      item = data;
      return Items.destroy({ where: { id: itemId } });
    })
    .then(() => {
      res.send(item);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.post("/favorites/add", (req, res) => {
  const { userId, itemId, category } = req.body;
  let user, item;
  axios
    .get(`https://api.themoviedb.org/3/${category}/${itemId}?api_key=${api}`)
    .then((response) => {
      item = response.data;
      return Users.findByPk(userId);
    })
    .then((data) => {
      user = data;
      return Items.findOrCreate({
        where: { id: item.id },
        defaults: {
          id: item.id,
          title: item.title || item.name,
          genres: item.genres.map((genre) => genre.name),
          director: item.director,
          release_date: item.release_date || item.first_air_date,
          poster_path: item.poster_path,
          overview: item.overview,
          category,
        },
      });
    })
    .then((data) => {
      const [item, notAdded] = data;
      if (notAdded) {
        user.addItems(item);
      }
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.get("/users/:id", (req, res) => {
  Users.findByPk(req.params.id, {
    include: Items,
  }).then((user) => {
    if (user) {
      res.send({ username: user.username, items: user.items || [] });
    } else {
      res.send({ username: "", items: [] });
    }
  });
});

router.post("/signup", (req, res) => {
  Users.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (!user) return res.sendStatus(401);
    const { id, username, email } = user;
    user.validatePassword(req.body.password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const token = generateToken({ id, username, email });
        res.cookie("token", token);
        res.sendStatus(200);
      }
    });
  });
});

router.get("/secret", (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
});

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`)
    .then((response) => res.send(response.data))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/tv/:id", (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${api}`)
    .then((response) => res.send(response.data))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
