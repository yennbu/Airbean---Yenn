import Product from '../models/product.js';

export async function getMenu() {
    try {
        const menu = await Product.find();
        return menu;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function getProduct(prodId) {
    try {
        const product = await Product.findOne({ prodId: prodId });
        return product;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export async function addProduct(productData) {
    try {
        const newProduct = await Product.create(productData);
        return newProduct;
    }
    catch (error) {
        throw error;
    }
}

export async function updateProduct(prodId, productData) {
    try {
        const { title, desc, price } = productData;
        const updatedProduct = await Product.findOneAndUpdate(
            { prodId: prodId },
            {
                $set: {
                    title: title,
                    desc: desc,
                    price: price
                }
            },
            { new: true }
        );
        return updatedProduct;
    }
    catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

export async function deleteProduct(prodId) {
    try {
        const result = await Product.findOneAndDelete({ prodId: prodId });
            return result;
    }
    catch (error) {
        console.log("Error:", error.message);
        return null;
    }
}

export async function searchProduct(title) {
    try {
        const products = await Product.find({ title: { $regex: title, $options: 'i' } });
        return products;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
