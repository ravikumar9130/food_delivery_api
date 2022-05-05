require("dotenv").config()
require("./config/database").connect();
const product = require("./model/product");
const products = require("./data/products")




const importData = async () => {
    try {
        
        await product.deleteMany({});
        console.log(products)
        await product.insertMany(products)
        console.log(" product is exportes sucessfully>>>.....")
        
        process.exit();
    }
    catch (err) {
        console.log("error in sender file go and check this...")
        console.log( err )
        process.exit(1);
    }
}


importData()