/*
  # Add order_items column to orders table

  1. Changes
    - Add `order_items` column of type JSONB to store order items array
    - Set default to empty array for existing records
    - Add index for better query performance on order items

  2. Security
    - No changes to existing RLS policies needed
*/

-- Add order_items column to store items as JSONB array
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'order_items'
  ) THEN
    ALTER TABLE orders ADD COLUMN order_items JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add index for better performance when querying order items
CREATE INDEX IF NOT EXISTS idx_orders_order_items ON orders USING gin (order_items);