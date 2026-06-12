require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Pass the email as command line argument: node makeAdmin.js admin@example.com
const email = process.argv[2];

if (!email) {
  console.log('Usage: node makeAdmin.js <email>');
  console.log('Example: node makeAdmin.js admin@example.com');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );
    if (user) {
      console.log(`✅ User "${user.name}" (${user.email}) is now an Admin!`);
    } else {
      console.log(`❌ No user found with email: ${email}`);
    }
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
