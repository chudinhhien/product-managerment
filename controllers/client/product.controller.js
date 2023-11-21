// [GET] /products
const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  })
    .sort( { position: "desc" } )

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(0)
    return item;
  })

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