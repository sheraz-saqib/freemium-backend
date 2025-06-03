const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Role = require('./role')(sequelize, DataTypes);
db.UserRole = require('./userRole')(sequelize, DataTypes);
db.Permission = require('./permission')(sequelize, DataTypes);
db.UserActivityLog = require('./userActivityLog')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.SubCategory = require('./subCategory')(sequelize, DataTypes);
db.Tool = require('./tool')(sequelize, DataTypes);
db.ToolVotes = require('./toolVotes')(sequelize, DataTypes);
db.ToolSubCategory = require('./toolSubCategory')(sequelize, DataTypes);
db.ToolImage = require('./toolImage')(sequelize, DataTypes);
db.Tag = require('./tag')(sequelize, DataTypes);

db.ToolTag = require('./toolTags')(sequelize, DataTypes); // Use singular for the pivot model

db.Review = require('./review')(sequelize, DataTypes);
db.Favorite = require('./favorite')(sequelize, DataTypes);
db.Subscription = require('./subscription')(sequelize, DataTypes);
db.Feature = require('./feature')(sequelize, DataTypes); 
db.PlanFeature = require('./planFeature')(sequelize, DataTypes);
db.ToolAnalytics = require('./toolAnalytics')(sequelize, DataTypes);
db.Notification = require('./notification')(sequelize, DataTypes);
db.Content = require('./content')(sequelize, DataTypes);
db.SearchLog = require('./searchLog')(sequelize, DataTypes);



// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
