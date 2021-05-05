const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  // find all categories and include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price','stock']
          }
        ]
  })
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value and include its associated Products
  Category.findOne({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(category => {
    if (!category) {
      res.status(404).json({ message: 'Category not found!'});
      return;
    }
    res.json(category);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
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
