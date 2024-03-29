const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags and include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: 'products' }]

    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    // if there is no tag mattching this ID it will return a message
    if (!tagData) {
      res.status(404).json({ message: 'No tag is found with this ID.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = req.body.tag_name;
    const tagData = await Tag.update(
      { tag_name: updatedTag },
      { where: { id: req.params.id } }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy(
      { where: { id:req.params.id } }
    );
    
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this ID." });
    }
    
    res.status(200).json({ message: "Tag successfully deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
