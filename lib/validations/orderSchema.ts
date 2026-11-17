import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  productImage: z.string().optional(),
  price: z.number().nonnegative("Price must be non-negative"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
  selectedSize: z.string().optional(),
  selectedWeight: z.string().optional(),
  selectedServices: z.array(z.string()).optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
});

export const createOrderSchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  customerName: z.string().min(2, "Full name must be at least 2 characters"),
  customerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  shippingAddress: z.string().min(5, "Delivery address must be at least 5 characters"),
  city: z.string().default("Dhaka"),
  division: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative().default(80),
  discount: z.number().nonnegative().default(0),
  totalAmount: z.number().positive("Total amount must be greater than zero"),
  paymentMethod: z.enum(["cod", "bkash", "nagad", "card"]).default("cod"),
  notes: z.string().optional(),
  deliveryZone: z.enum(["inside_dhaka", "outside_dhaka"]).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
