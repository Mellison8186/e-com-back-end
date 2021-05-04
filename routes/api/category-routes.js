const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.res, {
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    if (!category[0]){
      res.status(400).json({ message: 'Category does not exist'});
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'Category does not exist'});
        return;
      }
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }),
  });
});

module.exports = router;
