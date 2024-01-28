const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products *** I need to fix this***
      include: [Product],
      // I need to figure out how to include product as well as category
      //   include: [
      //     {
      //       model: Product,
      //       through: Category,
      //       as: 'product_cateogory'
      //     }
      // ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category is found with this ID.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    // const categoryData = await Category.update({
    //   where: { category_name: req.params.category_name }
    // })
    const updatedCategory = req.body.category_name;
    const categoryData = await Category.update(
      { category_name: updatedCategory },
      { where: { id: req.params.id }}
      );
    // categoryData.update({"id": req.body});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!categoryData) {
      res.status(400).json({ message: "No category found with this ID. "});
      return;
    }

    res.status(200).json({ message: "Category sucessfully deleted."});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
