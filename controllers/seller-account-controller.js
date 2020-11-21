const db = require("../db");


// to get the seller account logo:
const getUserURL = (req, res) => {
    console.log("user_id:", req.params.id)
    // let sql = `SELECT logo_url FROM users WHERE id = ${req.params.id}`
    let sql = `SELECT logo_url FROM users WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("getUserURL called")
        res.json(result)
    })
}

// to get the monthly sales month-to-date for the seller:
const getCurrentMonthlySales = (req, res) => {
    console.log("user_id:", req.params.id)
    let sql = `SELECT SUM(p.price) AS monthly_sales FROM product p JOIN sold_item si ON p.id = si.id WHERE p.seller_id = ${req.params.id} AND MONTH(CURRENT_DATE()) = MONTH(si.created_at) `
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("getCurrentMonthlySales called")
        // res.send("getCurrentMonthlySales called")
        res.json(result)
    })
}

// to get the total number of items available in the seller accounts's store
const totalNumberOfItemsAvailable = (req, res) => {
    console.log("user_id:", req.params.id)
    let sql = `SELECT (SELECT COUNT (p.seller_id) FROM product p WHERE p.seller_id = ${req.params.id}) - (SELECT COUNT(p.seller_id) FROM product p JOIN sold_item si WHERE p.id = si.product_id AND p.seller_id = ${req.params.id}) AS Items_Available`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("totalNumberOfItemsAvailable called")
        // res.send("totalNumberOfItemsAvailable called")
        res.json(result)
    })
}

// to get the number of items sold
const totalNumberOfItemsSold = (req, res) => {
    let sql = `SELECT COUNT(p.seller_id) AS Items_Sold FROM product p JOIN sold_item si WHERE p.id = si.product_id AND p.seller_id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("totalNumberOfItemsSold called")
        // res.send("totalNumberOfItemsSold called")
        res.json(result)
    })
}

// to get the seller's rating 
const sellerRating = (req, res) => {
    let sql = `SELECT AVG(rating_value) AS Avg_Rating FROM rating WHERE seller_id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("sellerRating called")
        // res.send("sellerRating called")
        res.json(result)
    })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  My store:

const getAllMyProducts = (req, res) => {
    let sql = `SELECT * FROM product WHERE seller_id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("getAllMyProducts called")
        // res.send("getAllMyProducts called")
        res.json(result)
    })
}

const updateProduct = (req, res) => {
    console.log("Seller Id :", req.params.id)
    console.log("Req.body :", req.body)
    let sql = `UPDATE product SET name = "${req.body.name}", price = "${req.body.price}", description = "${req.body.description}", newprice = "${req.body.newprice}", quantity = ${req.body.quantity}, img_url = "${req.body.img_url}", category_id = ${req.body.category_id}  WHERE id= "${req.body.id}" AND seller_id= ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("updateProduct called")
        // res.send("updateProduct called")
        res.json(result)
    })
}



const hideProduct = (req, res) => {
    console.log("Product id: ",req.params.id)
    console.log("Body: ",req.body)
    let sql = `UPDATE product SET hide = "Yes"  WHERE id = ${req.params.id} AND seller_id = ${req.body.seller_id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("hideProduct called")
        res.send("Product hidden")
        // res.json(result)
    })
}

const showProduct = (req, res) => {
    console.log("Product id: ",req.params.id)
    console.log("Seller id: ",req.body.seller_id)
    let sql = `UPDATE product SET hide = "No"  WHERE id = ${req.params.id} AND seller_id = ${req.body.seller_id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("showProduct called")
        res.send("showProduct called")
        // res.json(result)
    })
}

const addProduct = (req, res) => {
    console.log("addProduct has been called")
    console.log(req.params.id)
    console.log(req.body)
    let sql = `INSERT INTO product (name, price, description, newprice, quantity, seller_id, img_url, category_id, hide) 
    VALUES ("${req.body.name}", "${req.body.price}", "${req.body.description}", "${req.body.newprice}", ${req.body.quantity}, ${req.params.id}, "${req.body.img_url}", ${req.body.category_id}, "${req.body.hide}")`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("addProduct called")
        // res.send("addProduct called")
        res.json(result)
    })
}

// const addProduct = (product) => {
//     const sql = `INSERT INTO products (name, price, description, newprice,  quantity, seller_id, img_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//     const data = [product.name, product.pric, product.description, product.newprice, product.quantity, product.id, product.img_url, product.category_id];
//     db.query(sql, data, (err, results) => {
//       console.log(results);
//     });
//   };

const salesHistory = (req, res) => {
    let sql = `SELECT p.id, p.name, p.description, si.price FROM product p JOIN sold_item si WHERE p.id = si.product_id AND p.seller_id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err
        console.log("salesHistory called")
        // res.send("salesHistory called")
        res.json(result)
    })
}















module.exports = {
    getUserURL,
    getCurrentMonthlySales,
    totalNumberOfItemsAvailable,
    totalNumberOfItemsSold,
    sellerRating,
    getAllMyProducts, 
    updateProduct,
    hideProduct,
    showProduct,
    addProduct,
    salesHistory
}