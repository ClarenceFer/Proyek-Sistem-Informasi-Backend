const express = require("express");
const cors = require("cors");
const db = require("./models"); // Sequelize setup

const app = express();

// Configure CORS
const corsOptions = {
    origin: ["https://www.sibaso.site", "https://sibakso.vercel.app"] // URL frontend React
};
app.use(cors(corsOptions));

// Parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
db.sequelize.sync({ alter: true })
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Failed to sync database:", err.message));

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const courseTagRoutes = require('./routes/courseTag.routes');
const questionSetRoutes = require('./routes/questionSet.routes');
const fileRoutes = require('./routes/file.routes');
const dosenRoutes = require('./routes/dosen.routes');
const materialRoutes = require('./routes/materialTag.routes');
const dropdownRoutes = require('./routes/dropdown.routes');
const courseMaterialRoutes = require('./routes/courseMaterial.routes');

// Register routes
courseMaterialRoutes(app);
authRoutes(app);
userRoutes(app);
courseTagRoutes(app);
questionSetRoutes(app);
fileRoutes(app);
dosenRoutes(app);
materialRoutes(app);
dropdownRoutes(app);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
