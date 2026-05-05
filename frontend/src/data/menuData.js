const adjectives = ['Signature', 'Aesthetic', 'Gooey', 'Crispy', 'Velvet', 'Cloud', 'Rich', 'Midnight', 'Sun-kissed', 'Golden', 'Classic', 'Flaky', 'Silky', 'Premium', 'Artisan', 'Loaded', 'Chunky'];
const flavors = ['Matcha', 'Strawberry', 'Almond', 'Pistachio', 'Lavender', 'Dark Chocolate', 'Sea Salt', 'Caramel', 'Honey', 'Lemon', 'Mango', 'Truffle', 'Garlic', 'Espresso', 'Vanilla Bean', 'Hazelnut', 'Raspberry'];

const categoryMapping = {
  'brownies': { bases: ['Brownie', 'Blondie', 'Fudge Bar'], imgs: ['/chunky_cookies.png', '/bakery_vibe_1776934859373.png'] },
  'biscuits, cookies & crackers': { bases: ['Chunky Cookie', 'Biscotti', 'Shortbread', 'Cracker'], imgs: ['/chunky_cookies.png', '/cookie_box_aesthetic_1776935087110.png'] },
  'breads': { bases: ['Sourdough', 'Focaccia', 'Baguette', 'Brioche'], imgs: ['/sourdough_loaf.png', '/savory_focaccia.png'] },
  'cakes': { bases: ['Bento Cake', 'Cheesecake', 'Sponge Cake', 'Layer Cake'], imgs: ['/birthday_cake.png', '/hero_cheesecakes.png', '/bento_cake.png'] },
  'combos': { bases: ['Breakfast Box', 'Afternoon Tea Set', 'Bakery Bundle'], imgs: ['/cookie_box_aesthetic_1776935087110.png', '/bakery_hero_1776934825336.png'] },
  'croissant, danishes & muffins': { bases: ['Croissant', 'Danish', 'Muffin', 'Cruffin'], imgs: ['/aesthetic_pastries_1776934841310.png', '/bakery_vibe_1776934859373.png'] },
  'desserts & cupcakes': { bases: ['Cupcake', 'Tart', 'Mousse Cup', 'Pudding'], imgs: ['/bento_cake.png', '/aesthetic_pastries_1776934841310.png'] },
  'pastries': { bases: ['Eclair', 'Cream Puff', 'Viennoiserie', 'Turnover'], imgs: ['/aesthetic_pastries_1776934841310.png', '/bakery_hero_1776934825336.png'] },
  'sandwiches & savouries': { bases: ['Truffle Sandwich', 'Savory Quiche', 'Panini', 'Bagel'], imgs: ['/savory_focaccia.png', '/sourdough_loaf.png'] },
  'tea cakes': { bases: ['Pound Cake', 'Loaf Cake', 'Tea Bread'], imgs: ['/birthday_cake.png', '/bakery_vibe_1776934859373.png'] },
  'beverages': { bases: ['Latte', 'Matcha Sip', 'Cold Brew', 'Refresher'], imgs: ['/matcha_sip.png'] },
  'gifting': { bases: ['Signature Hamper', 'Cookie Box', 'Celebration Box'], imgs: ['/cookie_box_aesthetic_1776935087110.png'] },
  'collectibles': { bases: ['Merch Mug', 'Bakery Tote', 'Aesthetic Candle'], imgs: ['/watercolor_bakery.png'] },
  'chocolates': { bases: ['Truffle Box', 'Chocolate Bar', 'Ganache'], imgs: ['/chunky_cookies.png', '/bakery_hero_1776934825336.png'] },
  'mango specials': { bases: ['Mango Tart', 'Mango Cheesecake', 'Mango Pastry'], imgs: ['/bento_cake.png', '/birthday_cake.png'] }
};

const categories = Object.keys(categoryMapping);
const staticItems = [];
const usedNames = new Set();

while (staticItems.length < 100) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const data = categoryMapping[category];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const flav = flavors[Math.floor(Math.random() * flavors.length)];
  const base = data.bases[Math.floor(Math.random() * data.bases.length)];

  const name = `${adj} ${flav} ${base}`;

  if (!usedNames.has(name)) {
    usedNames.add(name);
    
    let price = (Math.random() * (25 - 5) + 5).toFixed(2);
    if (category === 'beverages') price = (Math.random() * (8 - 4) + 4).toFixed(2);
    if (category === 'cakes' || category === 'gifting') price = (Math.random() * (60 - 25) + 25).toFixed(2);

    staticItems.push({
      name: name,
      desc: `Our signature ${flav.toLowerCase()} ${base.toLowerCase()}, handcrafted for the ultimate ${adj.toLowerCase()} experience.`,
      price: parseFloat(price),
      category: category,
      image: data.imgs[Math.floor(Math.random() * data.imgs.length)]
    });
  }
}

export default staticItems;
