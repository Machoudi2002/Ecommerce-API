import { Request, Response } from "express";
import { Cart } from "../DB/Schema/cart.schema";


export const getMyCart = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user } = req.body;
        const myCart = await Cart.find({ user });
        if (!myCart) {
            res.status(404).json({ message: "User not found"});
        }

        if (myCart.length == 0) {
            res.status(200).json({ message: "Your Cart is empty"})
        }

        res.status(200).json(myCart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

export const addProductToCart = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user, product, quantity } = req.body;
        const existInCart = await Cart.find({ user, 'items.product': product })
        if (existInCart) {
            await Cart.findOneAndUpdate(
                { user, 'items.product': product },
                { $inc: { 'items.$.quantity': quantity } }
            );
        }

        await Cart.findOneAndUpdate(
            { user },
            {
                $push: {
                    items: {
                        product,
                        quantity
                    }
                }
            },
            { upsert: true }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

export const removeAmountFromCart = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user, product } = req.body;
        // Use find instead of findOne to get an array of documents
        const existingCartItems = await Cart.find({ user, 'items.product': product });

        if (existingCartItems.length > 0) {
            const currentCartItem = existingCartItems[0].items.find(item => item.product.equals(product));

            if (!currentCartItem) {
                // Handle the case where the item is not found in the cart
                res.status(404).json({ message: "Product not found in the cart" });
                return;
            }

            const newQuantity = currentCartItem.quantity - 1;

            if (newQuantity > 0) {
                // If the new quantity is greater than 0, update the quantity
                await Cart.findOneAndUpdate(
                    { user, 'items.product': product },
                    { $set: { 'items.$.quantity': newQuantity } }
                );
                res.status(200).json({ message: "Product quantity decreased in the cart successfully" });
            } else {
                // If the new quantity is 0, remove the entire item from the cart
                await Cart.findOneAndUpdate(
                    { user },
                    { $pull: { items: { product } } }
                );
                res.status(200).json({ message: "Product removed from the cart successfully" });
            }
        } else {
            res.status(404).json({ message: "Product not found in the cart" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

export const deleteProductFromCart = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user, product } = req.body;
        const existingCartItems = await Cart.find({ user, 'items.product': product });
        if (!existingCartItems) {
            res.status(404).json({ message: "Product not found" });
        }

        await Cart.findOneAndUpdate(
            { user },
            { $pull: { items: { product } } }
        );
        res.status(200).json({ message: "Product removed from the cart successfully" });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}