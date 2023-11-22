const productHelper = require('../../helpers/product')
const Product = require('../../models/product.model')
const ProductCategory = require('../../models/product-category.model')

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  })
    .sort( { position: "desc" } )

  const newProducts = productHelper.priceNewProducts(products)

  res.render('client/pages/products/index', {
    pageTitle: 'Trang danh sách sản phẩm',
    products: newProducts
  })
}

//[GET] /products/:slug
module.exports.detail = async (req,res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: 'active'
    }
    
    const product = await Product.findOne(find)

    // product.price  = product.price.toLocaleString("en-US", {style:"currency", currency:"USD"})

    res.render('client/pages/products/detail', {
      pageTitle: product.title,
      product: product
    })
  } catch (error) {
    res.redirect(`/products`)
  }
}

//[GET] /products/:slugCategory
module.exports.category = async (req,res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  })

  const products = await Product.find({
    product_category_id: category.id,
    deleted: false,
    status: 'active'
  }).sort({positon: "desc" })

  const newProducts = productHelper.priceNewProducts(products)
  
  res.render('client/pages/products/index', {
    pageTitle: 'Trang danh sách sản phẩm',
    products: newProducts
  })
}