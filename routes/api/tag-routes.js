const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

//* The `/api/tags` endpoint

// Find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ],
        through: ProductTag,
        as: 'product_tags'
      }
    ],
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Find a single tag by its ID 
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
        {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
          ],
          through: ProductTag,
          as: 'product_tags'
        }
    ],
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

  // Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))

  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // Update a tag's name by its ID value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbTagData) => {
    if (!dbTagData) {
      res.status(404).json({ message: 'Tag not found'});
      return;
    }
    res.json(dbTagData);
  })

  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
