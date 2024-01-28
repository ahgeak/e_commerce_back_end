const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// The `/api/categories` endpoint

// find all categories  and return data in JSON
router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products *** I need to fix this***
      include: [{ model: Product, as: 'products' }]
      // include: [{ model: Product }]

      // include: [Product],

      // I need to figure out how to include product as well as category
        // include: [
        //   {
        //     model: Product,
        //     through: Category,
        //     as: 'products'
        //   }
        // ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category using id value entered in the URL and return data in JSON
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    // if there is no categoryData matching the ID, return message
    if (!categoryData) {
      res.status(404).json({ message: 'No category is found with this ID.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post route to create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// put route to update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = req.body.category_name;
    const categoryData = await Category.update(
      { category_name: updatedCategory },
      { where: { id: req.params.id }}
      );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete route to delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy(
      { where: { id: req.params.id } }
      );

    if (!categoryData) {
      res.status(400).json({ message: "No category found with this ID. "});
      return;
    }

    res.status(200).json({ message: "Category successfully deleted."});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
