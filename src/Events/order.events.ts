import { Request, Response } from "express";
import { Order } from "../DB/Schema/order.schema";


export const postNewOrder = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user, shippingInfo, products, totalAmount } = req.body;
        const order = new Order({ user, shippingInfo, products, totalAmount });
        await order.save();
        res.status(200).json({
            message: "Order created successfully",
            order,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

export const getAllOrders = async (req: Request, res: Response) : Promise<void> => {
    try {
        const allOrders = await Order.find({});
        if (!allOrders || allOrders.length === 0) {
            res.status(404).json({ message: 'Products not found' });
            return;
        }
        res.status(200).json(allOrders)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

export const getMyOrders = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { user } = req.body;
        const myOrders = await Order.find({ user });
        res.status(200).json(myOrders)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"})
    }
}

