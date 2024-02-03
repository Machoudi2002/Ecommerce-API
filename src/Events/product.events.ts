import { Request, Response } from "express";
import { Product } from "../DB/Schema/product.schema";
import { productSlugGenerator } from "./productSlugGenerator";
import { upload } from "./upload.events";
import multer from "multer";
import mongoose from "mongoose";


export const postNewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      // Check for duplicate name
      const existingProduct = await Product.findOne({ name: req.body.name });
      if (existingProduct) {
        res.status(400).json({ message: 'A product with the same name already exists.' });
        return;
      }
  
      // Function to handle file upload
      const handleFileUpload = () => {
        upload(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
            console.error(err);
            res.status(400).json({ message: 'File upload error.' });
          } else if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error.' });
          } else {
            const image = req.file?.filename;
            if (!image) {
              res.status(400).json({ message: 'No file uploaded.' });
            } else {
              // If all checks pass, create and save the product
              const { name, description, category, price, quantity } = req.body;
              const slug = productSlugGenerator(name);
  
              const newProduct = new Product({
                name,
                slug,
                description,
                image,
                category,
                price,
                quantity,
              });
  
              const saveProduct = await newProduct.save();
  
              res.status(200).json({
                message: 'Product saved successfully.',
                saveProduct,
              });
            }
          }
        });
      };
  
      // Call the function to handle file upload only if there are no duplicate names
      if (!existingProduct) {
        handleFileUpload();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server error' });
    }
  };
  

export const getAllProducts = async (req: Request, res: Response) : Promise<void> => {
    try {
        const allProducts = await Product.find({})
        if (!allProducts || allProducts.length === 0) {
            res.status(404).json({ message: 'Products not found' });
            return;
        }
        res.status(200).json({
            allProducts,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"} );
    }
}

export const getProductBySlug = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({
            product,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"} );
    }
}

export const updateProductById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true },
        );

        if (!updateProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({
            message: "Product updated succesfully.",
            updateProduct,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"} );
    }
}

export const deleteProductById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params
        const isValidObjectId = mongoose.isValidObjectId(id);
        if (!isValidObjectId) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json({ message: "Product Deleted Successfully."})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server error"} );
    }
}