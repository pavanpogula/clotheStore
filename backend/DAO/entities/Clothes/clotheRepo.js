

//getClothes
//addClothes
//updateClothes


const { ObjectId } = require('mongodb');
const { brandCollection, clotheCollection, chunksCollection } = require('../Collection');


const addClothes = async (productData) => {
    try {
        const {
            title,
            description,
            price,
            company,
            quantity,
            sizes,
            brand,
            img,
            color
        } = productData

        if (brand === 'new') {
            const brandData = await brandCollection.insertOne({ 'brand': company });
        }
        const timestamp = new Date();
        let sizesArray = sizes;
        const sizesData = sizesArray.reduce((result, size) => {
            result[size] = parseInt(quantity);
            return result;
        }, {});
        clotheCollection.insertOne({
            'title': title,
            'description': description,
            'price': price,
            'brand': brand === 'new' ? company : brand,
            'sizes': sizesData,
            'img': img,
            'timestamp': timestamp,
            'color': color
        })
        return {
            "msg": "good"
        }
    } catch (error) {
        console.log(" addClothes error  ", error.message);
        return {
            "msg": "bad"
        }
    }
}

const updateProductAdmin = async ({ productId, sizes, quantity, price, color, title, description }) => {
    try {
        const productData = await clotheCollection.findOne({ _id: new ObjectId(productId) });
        //size from product
        const existingSizes = productData["sizes"]

        //incomingSizes
        let sizesArray = sizes;
        const updateSizes = sizesArray.reduce((result, size) => {
            result[size] = parseInt(quantity);
            return result;
        }, {});

        let newSizes = { ...existingSizes };

        Object.keys(updateSizes).forEach((size) => {
            if (newSizes.hasOwnProperty(size)) {
                newSizes[size] = String(Number(existingSizes[size]) + updateSizes[size]);
            } else {
                newSizes[size] = String(updateSizes[size]);
            }
        });


        const updatedData = await clotheCollection.updateOne(
            { _id: new ObjectId(productId) },
            {
                $set: {
                    'title': title,
                    'description': description,
                    'sizes': newSizes,
                    'timestamp': new Date(),
                    'price': price,
                    'color': color

                }
            }
        );

        return {
            "msg": "good"
        }

    } catch (error) {
        console.log(" fetchDepartments error  ", error.message);
        return {
            "msg": "bad"
        }

    }
}


const getAllBrands = async () => {
    try {
        const data = await brandCollection.find({}).project({ brand: 1, _id: 0 }).toArray()
        let arrayD = []
        arrayD = data.map(obj => obj["brand"])
        console.log("brands data from db ", arrayD)

        return { "brands": arrayD };

    } catch (error) {
        console.log(" fetchDepartments error  ", error.message);
        return {
            "brands": []
        }

    }
}


async function getAllProductsWithImages() {

    try {
        const products = await clotheCollection.find().toArray();
        console.log("products data  :", products)
        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const image = await chunksCollection.findOne({ files_id: new ObjectId(product.img) });

                const binaryData = image.data;
                const base64Data = await binaryData.toString('base64');
                const imageUrl = `data:image/jpeg;base64,${base64Data}`;

                return { ...product, image: imageUrl };
            })
        );
        return productsWithImages;
    } catch (error) {
        console.log(error)
        return "error"
    }
}






module.exports = {
    addClothes,
    getAllBrands,
    getAllProductsWithImages,
    updateProductAdmin

}