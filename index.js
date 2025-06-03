const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const toolRoutes = require('./routes/toolRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const searchLogRoutes = require('./routes/searchLogRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const featureRoutes = require('./routes/featureRoutes');


const app = express();
const PORT = 3000;

app.use(express.json());

// Test DB and sync model
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connected...');
        return sequelize.sync(); // syncs all models
    })
    .then(() => {
        console.log('📦 Models synchronized...');
    })
    .catch(err => console.error('❌ Error: ' + err));

app.get('/', (req, res) => {
    res.send('✅ API is working perfectly!');
});

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/tools', toolRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/permissions", permissionRoutes);
app.use('/api/search-logs', searchLogRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/features', featureRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});
