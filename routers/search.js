const express = require('express');
const axios = require('axios');
const { Food } = require('../db/models/index');

const router = express.Router();

router.route('/search')
  .get(async (req, res) => {
    const food = await Food.findAll({where: {UserId: req.session.user.id}});

    res.render('search', { food });
  })
  .post(async (req, res) => {
    console.log(req.body.request);
    if (req.body.request) {
      try {
        const response = await axios(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${req.body.request}`);
        // const popularFilmsFromDB = response.data.results;
        const arrFood = response.data.foods[0].foodNutrients;
        const protein = arrFood.find((el) => el.nutrientId === 1003).value;
        const fat = arrFood.find((el) => el.nutrientId === 1004).value;
        const carbohydrate = arrFood.find((el) => el.nutrientId === 1005).value;
        const calories = arrFood.find((el) => el.nutrientId === 1008).value;
        await Food.create({
          nameFood: req.body.request,
          protein,
          fat,
          carbohydrate,
          calories,
          UserId: req.session.user.id,
        });
      } catch (error) {
        console.error(error);
      }

      // console.log(prot, fat, carbohydrate, calories);
      // console.log(arrFood);
      // res.redirect('search');
      return res.json({ created: true });
    } return res.json({ created: false });
  })
  .delete(async (req, res) => {
    try {
      const { foodId } = req.body;
      // eslint-disable-next-line no-unused-vars
      const deleted = await Food.destroy({ where: { id: foodId } });
    } catch (error) {
      console.error(error);

      return res.status(401).json({ deleted: false });
    }
    return res.json({ deleted: true });
  });

module.exports = router;

// const response = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
//     const popularFilmsFromDB = response.data.results;
