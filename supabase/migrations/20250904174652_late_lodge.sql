/*
  # Create orders and order items system

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique) - Generated order number for tracking
      - `customer_name` (text) - Customer's full name
      - `customer_email` (text) - Customer's email address
      - `customer_phone` (text) - Customer's phone number
      - `customer_address` (text) - Customer's delivery address
      - `customer_city` (text) - Customer's city
      - `payment_method` (text) - Selected payment method
      - `subtotal` (numeric) - Subtotal before delivery charges
      - `delivery_charge` (numeric) - Delivery/shipping charges
      - `total_amount` (numeric) - Final total amount
      - `status` (text) - Order status (pending, confirmed, shipped, delivered, cancelled)
      - `created_at` (timestamptz) - Order creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key) - References orders.id
      - `item_code` (text) - Product/item code
      - `subject` (text) - Subject name
      - `board` (text) - Examination board (Cambridge/Edexcel)
      - `level` (text) - Education level (A Level, O Level, IGCSE)
      - `type` (text) - Material type (Question Papers, Mark Schemes)
      - `year_range` (text) - Year range of the materials
      - `component` (text) - Component identifier
      - `price` (numeric) - Individual item price
      - `created_at` (timestamptz) - Item creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (for order tracking)
    - Add policies for anonymous/authenticated users to create orders

  3. Indexes
    - Index on order_number for fast lookups
    - Index on customer_email for customer order history
    - Index on order_id in order_items for efficient joins
    - Index on created_at for chronological queries

  4. Triggers
    - Auto-update updated_at timestamp on orders table
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  payment_method text NOT NULL,
  subtotal numeric(10,2) NOT NULL,
  delivery_charge numeric(10,2) NOT NULL DEFAULT 0,
  total_amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_code text NOT NULL,
  subject text NOT NULL,
  board text NOT NULL,
  level text NOT NULL,
  type text NOT NULL,
  year_range text NOT NULL,
  component text NOT NULL,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
-- Allow anyone to create orders (for checkout process)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read orders (for order tracking by email or order number)
CREATE POLICY "Users can read orders by email"
  ON orders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for order_items table
-- Allow anyone to create order items (part of checkout process)
CREATE POLICY "Anyone can create order items"
  ON order_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read order items
CREATE POLICY "Users can read order items"
  ON order_items
  FOR SELECT
  TO anon, authenticated
  USING (true);