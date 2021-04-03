const router = require('express').Router();
// const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products

//confirmed working 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products

//confirmed working
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category matches this ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//confirmed working
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});

//confirmed working
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData[0]) {
      res.status(404).json( { message: 'No category matches this ID' } );
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// confirmed working
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy( {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category matches this ID' });
      return;
    } 
    res.status(200).json(categoryData);
   } catch (err) {
     res.status(500).json(err);
   }
});

module.exports = router;
