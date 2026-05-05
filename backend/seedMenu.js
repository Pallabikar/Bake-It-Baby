const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bakeitbaby';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Seeding Menu...');

    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items.');

    const adjectives = ['Aesthetic', 'Gooey', 'Crispy', 'Velvet', 'Cloud', 'Rich', 'Signature', 'Rustic', 'Midnight', 'Golden', 'Classic', 'Flaky', 'Silky', 'Premium', 'Artisan', 'Loaded', 'Chunky'];
    const flavors = ['Matcha', 'Strawberry', 'Almond', 'Pistachio', 'Lavender', 'Dark Chocolate', 'Sea Salt', 'Caramel', 'Lemon', 'Mango', 'Truffle', 'Garlic', 'Espresso', 'Vanilla Bean'];

    const categoryMapping = {
      'brownies': ['Brownie', 'Blondie', 'Fudge Bar'],
      'biscuits, cookies & crackers': ['Chunky Cookie', 'Biscotti', 'Shortbread', 'Cracker'],
      'breads': ['Sourdough', 'Focaccia', 'Baguette', 'Brioche'],
      'cakes': ['Bento Cake', 'Cheesecake', 'Sponge Cake', 'Layer Cake'],
      'combos': ['Breakfast Box', 'Afternoon Tea Set', 'Bakery Bundle'],
      'croissant, danishes & muffins': ['Croissant', 'Danish', 'Muffin', 'Cruffin'],
      'desserts & cupcakes': ['Cupcake', 'Tart', 'Mousse Cup', 'Pudding'],
      'pastries': ['Eclair', 'Cream Puff', 'Viennoiserie', 'Turnover'],
      'sandwiches & savouries': ['Truffle Sandwich', 'Savory Quiche', 'Panini', 'Bagel'],
      'tea cakes': ['Pound Cake', 'Loaf Cake', 'Tea Bread'],
      'beverages': ['Latte', 'Matcha Sip', 'Cold Brew', 'Refresher'],
      'gifting': ['Signature Hamper', 'Cookie Box', 'Celebration Box'],
      'collectibles': ['Merch Mug', 'Bakery Tote', 'Aesthetic Candle'],
      'chocolates': ['Truffle Box', 'Chocolate Bar', 'Ganache'],
      'mango specials': ['Mango Tart', 'Mango Cheesecake', 'Mango Pastry']
    };

    const imageMapping = {
      'brownies': '/chunky_cookies.png',
      'biscuits, cookies & crackers': '/chunky_cookies.png',
      'breads': '/sourdough_loaf.png',
      'cakes': '/tea_time_cake.png',
      'combos': '/cookie_box_aesthetic_1776935087110.png',
      'croissant, danishes & muffins': '/aesthetic_pastries_1776934841310.png',
      'desserts & cupcakes': '/bento_cake.png',
      'pastries': '/aesthetic_pastries_1776934841310.png',
      'sandwiches & savouries': '/savory_focaccia_1776937969928.png',
      'tea cakes': '/tea_time_cake.png',
      'beverages': '/matcha_sip.png',
      'gifting': '/cookie_box_aesthetic_1776935087110.png',
      'collectibles': '/watercolor_bakery.png',
      'chocolates': '/chunky_cookies.png',
      'mango specials': '/bento_cake.png'
    };

    const categories = Object.keys(categoryMapping);
    const generatedItems = [];
    const usedNames = new Set();

    while (generatedItems.length < 100) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const bases = categoryMapping[category];
      
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const flav = flavors[Math.floor(Math.random() * flavors.length)];
      const base = bases[Math.floor(Math.random() * bases.length)];

      const name = `${adj} ${flav} ${base}`;

      if (!usedNames.has(name)) {
        usedNames.add(name);
        
        let price = (Math.random() * (25 - 5) + 5).toFixed(2);
        if (category === 'beverages') price = (Math.random() * (8 - 4) + 4).toFixed(2);
        if (category === 'cakes' || category === 'gifting') price = (Math.random() * (60 - 25) + 25).toFixed(2);

        generatedItems.push({
          name: name,
          description: `Our signature ${flav.toLowerCase()} ${base.toLowerCase()}, handcrafted for the ultimate ${adj.toLowerCase()} experience.`,
          price: parseFloat(price),
          category: category,
          image: imageMapping[category]
        });
      }
    }

    await MenuItem.insertMany(generatedItems);
    console.log(`Successfully seeded ${generatedItems.length} unique items across 15 categories!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
