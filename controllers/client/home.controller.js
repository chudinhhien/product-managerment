const Product = require('../../models/product.model')
const productHelper = require('../../helpers/product')
// [GET] /
module.exports.index = async (req, res) => {
  //Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    deleted: false,
    featured: '1',
    status: 'active'
  })

  const newProductsFeatured = productHelper.priceNewProducts(productsFeatured)

  //Hiển thị danh sách sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: 'active'
  }).sort({position: "desc" }).limit(6)
  
  const newProductsNew = productHelper.priceNewProducts(productsNew)

  res.render('client/pages/home/index', {
    pageTitle: 'Trang chủ',
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  })
}