const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/bakeitbaby')
  .then(async () => {
    console.log('MongoDB Connected');
    
    const email = 'admin@bakeitbaby.com';
    const password = 'password123';
    
    let user = await User.findOne({ email });
    if (user) {
        console.log('Admin already exists');
        process.exit(0);
    }

    user = new User({
        name: 'Admin Vibes',
        email,
        password,
        role: 'admin'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    console.log('Admin user created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
