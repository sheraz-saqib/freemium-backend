const {
  signUpController,
  loginController,
  logoutController,
} = require("../controllers/authController");
const {
  addcategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
} = require("../controllers/categoryController");
const {
  getAllPricingPlansController,
  addPricingPlanController,
  deletePricingPlanController,
  editPricingPlanController,
} = require("../controllers/pricingController");
const {
  getAllRolesController,
  addRoleController,
  editRoleController,
  deleteRoleController,
} = require("../controllers/roleController");
const {
  getAllTagsController,
  addTagController,
  editTagController,
  deleteTagController,
} = require("../controllers/tagController");
const {
  getAllToolController,
  addToolController,
  editToolController,
  deleteToolController,
} = require("../controllers/toolController");
const {
  signUpValidation,
  loginValidation,
} = require("../Middlewares/authValidation");
const cookieAuthValidation = require("../Middlewares/cookieAuthValidation");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("WELCOME FREEMIUM");
});

//Auth
router.post("/login", loginValidation, loginController);
router.post("/signup", signUpValidation, signUpController);
router.post("/logout", cookieAuthValidation, logoutController);

//Category
router.get("/categories", getAllCategoryController);
router.post("/category/add", addcategoryController);
router.put("/category/edit", editCategoryController);
router.delete("/category/delete", deleteCategoryController);

//Tools
router.get("/tools", getAllToolController);
router.post("/tool/add", addToolController);
router.put("/tool/edit", editToolController);
router.delete("/tool/delete", deleteToolController);

//Tags
router.get("/tags", getAllTagsController);
router.post("/tag/add", addTagController);
router.put("/tag/edit", editTagController);
router.delete("/tag/delete", deleteTagController);

//Pricing
router.get("/pricings", getAllPricingPlansController);
router.post("/pricing/add", addPricingPlanController);
router.put("/pricing/edit", editPricingPlanController);
router.delete("/pricing/delete", deletePricingPlanController);

//Role
router.get("/roles", getAllRolesController);
router.post("/role/add", addRoleController);
router.put("/role/edit", editRoleController);
router.delete("/role/delete", deleteRoleController);

//Protected routes
router.get("/products", cookieAuthValidation, (req, res) => {
  res.status(200).json([
    {
      name: "iphoneX",
      price: 45000,
    },
    {
      name: "iphone11",
      price: 75000,
    },
  ]);
});

module.exports = router;
