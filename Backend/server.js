import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  // --- FEATURED & HOME PAGE LEADERS ---
  { _id: '1', name: 'AirPods Pro', image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80', price: 24900, isFeatured: true, isNewArrival: true, countInStock: 10, brand: 'Apple', rating: 4.8, description: 'Active Noise Cancellation and transparency mode.' },
  { _id: '2', name: 'MacBook Pro 14', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', price: 199900, isFeatured: true, isNewArrival: false, countInStock: 5, brand: 'Apple', rating: 4.9, description: 'Supercharged by M3 Pro chip.' },
  { _id: '3', name: 'PlayStation 5', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80', price: 49990, isFeatured: true, isNewArrival: true, countInStock: 7, brand: 'Sony', rating: 4.9, description: 'Ultra-high speed SSD and haptic feedback.' },
  { _id: '4', name: 'MX Master 3S', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80', price: 9900, isFeatured: true, isNewArrival: true, countInStock: 20, brand: 'Logitech', rating: 4.9, description: 'Ergonomic wireless mouse with silent clicks.' },

  // --- UNIQUE PRODUCTS (MERGED & VERIFIED) ---
 // --- UNIQUE PRODUCTS (UPDATED PATHS) ---
{ _id: '7', name: 'Sony ZV-E10', image: '/Sony ZV-E10.webp', price: 65000, isNewArrival: true, countInStock: 4, brand: 'Sony', rating: 4.5, description: 'The perfect mirrorless camera for vloggers.' },
{ _id: '14', name: 'Steam Deck', image: '/deck.webp', price: 39900, isNewArrival: true, countInStock: 6, brand: 'Valve', rating: 4.9, description: 'Handheld gaming PC by Valve.' },
{ _id: '15', name: 'Sony Alpha a7 IV', image: '/Sony Alpha a7 IV.jpg', price: 229000, isNewArrival: true, countInStock: 3, brand: 'Sony', rating: 4.9, description: 'Professional full-frame mirrorless camera.' },
{ _id: '16', name: 'GoPro Hero 11', image: '/GoPro Hero 11.webp', price: 42000, isNewArrival: true, countInStock: 15, brand: 'GoPro', rating: 4.5, description: 'Versatile action camera for adventure.' },
{ _id: '23', name: 'Apple Watch Ultra', image: '/Apple Watch Ultra.jpg', price: 89900, isNewArrival: true, countInStock: 5, brand: 'Apple', rating: 4.9, description: 'Rugged titanium sports watch.' },
{ _id: '25', name: 'Logitech G Pro X 2', image: '/Logitech G Pro X 2.jpg', price: 15900, isNewArrival: true, countInStock: 9, brand: 'Logitech', rating: 4.9, description: 'Lightspeed wireless gaming headset.' },
{ _id: '8', name: 'Nintendo Switch', image: '/Nintendo Switch.webp', price: 28000, isNewArrival: true, countInStock: 11, brand: 'Nintendo', rating: 4.8, description: 'Hybrid gaming console.' },
{ _id: '12', name: 'Kindle Paperwhite', image: '/Kindle Paperwhite.jpg', price: 13900, isNewArrival: true, countInStock: 18, brand: 'Amazon', rating: 4.6, description: 'E-reader with 6.8 inch display.' },
{ _id: '17', name: 'ASUS ROG Ally', image: '/ASUS ROG Ally.png', price: 69900, isNewArrival: true, countInStock: 5, brand: 'ASUS', rating: 4.6, description: 'Windows 11 gaming handheld.' },
{ _id: '24', name: 'Elgato Stream Deck', image: '/Elgato Stream Deck.jpg', price: 13500, isNewArrival: true, countInStock: 10, brand: 'Elgato', rating: 4.8, description: 'Studio controller for content creators.' },

  // --- REMAINING INVENTORY ---
  { _id: '11', name: 'iPad Air M2', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', price: 59900, isNewArrival: true, countInStock: 8, brand: 'Apple', rating: 4.9, description: 'Powerful, thin, and colorful.' },
  { _id: '13', name: 'Bose QC45', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', price: 29900, isNewArrival: true, countInStock: 12, brand: 'Bose', rating: 4.8, description: 'High-fidelity audio with noise cancelling.' },
  { _id: '22', name: 'WD My Passport 4TB', image: 'https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?auto=format&fit=crop&w=800&q=80', price: 8900, isNewArrival: true, countInStock: 25, brand: 'Western Digital', rating: 4.5, description: 'Portable hard drive for data backup.' },
  { _id: '5', name: 'Keychron K2', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80', price: 8500, isNewArrival: true, countInStock: 14, brand: 'Keychron', rating: 4.7, description: 'Compact wireless mechanical keyboard.' },
  { _id: '6', name: 'Samsung Odyssey G7', image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=800&q=80', price: 45000, isNewArrival: true, countInStock: 4, brand: 'Samsung', rating: 4.6, description: 'Curved QLED gaming monitor.' },
  { _id: '9', name: 'Razer DeathAdder', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80', price: 4500, isNewArrival: true, countInStock: 30, brand: 'Razer', rating: 4.4, description: 'Ergonomic wired gaming mouse.' },
  { _id: '10', name: 'DJI Mini 3 Pro', image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80', price: 75000, isNewArrival: true, countInStock: 2, brand: 'DJI', rating: 4.7, description: 'Pro-level drone in a mini body.' },
  { _id: '18', name: 'HyperX QuadCast', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80', price: 12000, isNewArrival: true, countInStock: 7, brand: 'HyperX', rating: 4.7, description: 'USB condenser gaming microphone.' },
  { _id: '19', name: 'Google Pixel 8', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80', price: 75900, isNewArrival: true, countInStock: 10, brand: 'Google', rating: 4.6, description: 'The helpful phone engineered by Google.' },
  { _id: '20', name: 'Nanoleaf Shapes', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80', price: 18000, isNewArrival: true, countInStock: 6, brand: 'Nanoleaf', rating: 4.4, description: 'Modular smart light panels.' },
  { _id: '21', name: 'Philips Hue Sync', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', price: 21000, isNewArrival: true, countInStock: 8, brand: 'Philips', rating: 4.3, description: 'Smart light control box.' }
];

// --- API ROUTES ---

// 1. Get All Products (Includes basic search by name or brand)
app.get('/api/products', (req, res) => {
  const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : null;
  
  if (keyword) {
    const filtered = products.filter(
      p => p.name.toLowerCase().includes(keyword) || p.brand.toLowerCase().includes(keyword)
    );
    return res.json(filtered);
  }
  
  res.json(products);
});

// 2. Get Featured Products (for home banners/carousels)
app.get('/api/products/featured', (req, res) => {
  res.json(products.filter(p => p.isFeatured));
});

// 3. Get New Arrivals
app.get('/api/products/new', (req, res) => {
  res.json(products.filter(p => p.isNewArrival));
});

// 4. Get Single Product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

// --- ERROR HANDLING ---
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ready on http://localhost:${PORT}`));