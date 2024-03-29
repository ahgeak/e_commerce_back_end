// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // ensure this is the correct reference 
  as: 'category'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'cateogry_id',
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { 
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id' 
});

// Products have many Tags
Product.hasMany(Tag, {
  foreignKey: 'tag_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products',
  foreignKey: 'tag_id'
});

// export all modules
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
