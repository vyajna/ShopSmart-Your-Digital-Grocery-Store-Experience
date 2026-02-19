const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Category = require('./models/Category');
const Product = require('./models/Product');

// Helper function to create SVG images
function createProductSVG(name, color1, emoji) {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g${name.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color1};stop-opacity:1"/><stop offset="100%" style="stop-color:${color1};stop-opacity:0.7"/></linearGradient></defs><rect width="400" height="300" fill="url(#g${name.replace(/\s/g, '')})"/><text x="50%" y="40%" font-family="Arial" font-size="60" text-anchor="middle">${emoji}</text><text x="50%" y="60%" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">${name}</text><text x="50%" y="70%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" opacity="0.9">Fresh &amp; Organic</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Sample categories
const categories = [
  {
    name: 'Vegetables',
    description: 'Fresh and organic vegetables',
    image: createProductSVG('Vegetables', '#228B22', '🥬'),
    isActive: true
  },
  {
    name: 'Fruits',
    description: 'Fresh seasonal fruits',
    image: createProductSVG('Fruits', '#FF6347', '🍎'),
    isActive: true
  },
  {
    name: 'Dairy',
    description: 'Fresh dairy products',
    image: createProductSVG('Dairy', '#87CEEB', '🥛'),
    isActive: true
  },
  {
    name: 'Snacks',
    description: 'Delicious snacks and munchies',
    image: createProductSVG('Snacks', '#DAA520', '🍿'),
    isActive: true
  },
  {
    name: 'Beverages',
    description: 'Refreshing drinks and beverages',
    image: createProductSVG('Beverages', '#FFA500', '🧃'),
    isActive: true
  },
  {
    name: 'Bakery',
    description: 'Fresh baked goods',
    image: createProductSVG('Bakery', '#D2691E', '🍞'),
    isActive: true
  }
];

// Sample products (will be populated after categories are created)
let products = [];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Get category IDs
    const vegetablesId = createdCategories.find(c => c.name === 'Vegetables')._id;
    const fruitsId = createdCategories.find(c => c.name === 'Fruits')._id;
    const dairyId = createdCategories.find(c => c.name === 'Dairy')._id;
    const snacksId = createdCategories.find(c => c.name === 'Snacks')._id;
    const beveragesId = createdCategories.find(c => c.name === 'Beverages')._id;
    const bakeryId = createdCategories.find(c => c.name === 'Bakery')._id;

    // Create products
    products = [
      // Vegetables
      {
        name: 'Fresh Tomatoes',
        description: 'Red, ripe and juicy tomatoes',
        price: 40,
        category: vegetablesId,
        image: createProductSVG('Tomatoes', '#FF6347', '🍅'),
        stock: 100,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Potatoes',
        description: 'Fresh farm potatoes',
        price: 30,
        category: vegetablesId,
        image: createProductSVG('Potatoes', '#D2691E', '🥔'),
        stock: 150,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Onions',
        description: 'Premium quality onions',
        price: 35,
        category: vegetablesId,
        image: createProductSVG('Onions', '#DAA520', '🧅'),
        stock: 120,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Carrots',
        description: 'Fresh orange carrots',
        price: 45,
        category: vegetablesId,
        image: createProductSVG('Carrots', '#FF8C00', '🥕'),
        stock: 80,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Spinach',
        description: 'Fresh green spinach leaves',
        price: 25,
        category: vegetablesId,
        image: createProductSVG('Spinach', '#228B22', '🥬'),
        stock: 60,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },

      // Fruits
      {
        name: 'Fresh Apples',
        description: 'Crisp and sweet red apples',
        price: 120,
        category: fruitsId,
        image: createProductSVG('Apples', '#DC143C', '🍎'),
        stock: 90,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Bananas',
        description: 'Ripe yellow bananas',
        price: 50,
        category: fruitsId,
        image: createProductSVG('Bananas', '#FFD700', '🍌'),
        stock: 100,
        unit: 'dozen',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Oranges',
        description: 'Juicy fresh oranges',
        price: 80,
        category: fruitsId,
        image: createProductSVG('Oranges', '#FFA500', '🍊'),
        stock: 70,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Mangoes',
        description: 'Sweet and juicy mangoes',
        price: 150,
        category: fruitsId,
        image: createProductSVG('Mangoes', '#FF8C00', '🥭'),
        stock: 50,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Grapes',
        description: 'Fresh seedless grapes',
        price: 90,
        category: fruitsId,
        image: createProductSVG('Grapes', '#9370DB', '🍇'),
        stock: 40,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },

      // Dairy
      {
        name: 'Fresh Milk',
        description: 'Full cream fresh milk',
        price: 60,
        category: dairyId,
        image: createProductSVG('Milk', '#F0F8FF', '🥛'),
        stock: 200,
        unit: 'liter',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Cheddar Cheese',
        description: 'Premium cheddar cheese',
        price: 350,
        category: dairyId,
        image: createProductSVG('Cheese', '#FFD700', '🧀'),
        stock: 30,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Yogurt',
        description: 'Fresh plain yogurt',
        price: 45,
        category: dairyId,
        image: createProductSVG('Yogurt', '#FFF8DC', '🥛'),
        stock: 100,
        unit: 'piece',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Butter',
        description: 'Fresh salted butter',
        price: 280,
        category: dairyId,
        image: createProductSVG('Butter', '#FFFACD', '🧈'),
        stock: 50,
        unit: 'kg',
        isFeatured: false,
        isActive: true
      },

      // Snacks
      {
        name: 'Potato Chips',
        description: 'Crispy salted potato chips',
        price: 20,
        category: snacksId,
        image: createProductSVG('Chips', '#FFD700', '🍟'),
        stock: 150,
        unit: 'piece',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Cookies',
        description: 'Chocolate chip cookies',
        price: 80,
        category: snacksId,
        image: createProductSVG('Cookies', '#D2691E', '🍪'),
        stock: 100,
        unit: 'pack',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Mixed Nuts',
        description: 'Premium roasted mixed nuts',
        price: 450,
        category: snacksId,
        image: createProductSVG('Nuts', '#8B4513', '🥜'),
        stock: 60,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },

      // Beverages
      {
        name: 'Orange Juice',
        description: 'Fresh squeezed orange juice',
        price: 120,
        category: beveragesId,
        image: createProductSVG('Orange Juice', '#FFA500', '🧃'),
        stock: 80,
        unit: 'liter',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Green Tea',
        description: 'Premium green tea bags',
        price: 250,
        category: beveragesId,
        image: createProductSVG('Green Tea', '#228B22', '🍵'),
        stock: 50,
        unit: 'pack',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Coffee Beans',
        description: 'Freshly roasted coffee beans',
        price: 600,
        category: beveragesId,
        image: createProductSVG('Coffee', '#4B3621', '☕'),
        stock: 40,
        unit: 'kg',
        isFeatured: true,
        isActive: true
      },

      // Bakery
      {
        name: 'White Bread',
        description: 'Fresh white sandwich bread',
        price: 40,
        category: bakeryId,
        image: createProductSVG('Bread', '#F5DEB3', '🍞'),
        stock: 100,
        unit: 'piece',
        isFeatured: false,
        isActive: true
      },
      {
        name: 'Croissants',
        description: 'Buttery fresh croissants',
        price: 15,
        category: bakeryId,
        image: createProductSVG('Croissants', '#DAA520', '🥐'),
        stock: 80,
        unit: 'piece',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake',
        price: 450,
        category: bakeryId,
        image: createProductSVG('Cake', '#8B4513', '🎂'),
        stock: 20,
        unit: 'piece',
        isFeatured: true,
        isActive: true
      }
    ];

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log(`   - Featured Products: ${createdProducts.filter(p => p.isFeatured).length}`);
    console.log(`\n✨ You can now browse products at http://localhost:4200`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
