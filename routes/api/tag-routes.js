const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

//* The `/api/tags` endpoint

// GET all tags
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

// GET a single tag by its ID 
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

// CREATE a new tag
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

// UPDATE a tag's name by its ID 
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

  // DELETE on tag by its ID
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
