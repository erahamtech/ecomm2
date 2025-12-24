const Product = require("../models/product.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");
const { uploadToS3 } = require("../middleware/upload.middleware");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(new ApiResponse(true, product, "Product created"));
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) throw new ApiError(404, "Product not found");
  res.json(new ApiResponse(true, product, "Product updated"));
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
  res.json(new ApiResponse(true, null, "Product deleted"));
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) throw new ApiError(404, "Product not found");
  res.json(new ApiResponse(true, product));
});

exports.listProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = "-createdAt",
    search,
    category,
    minPrice,
    maxPrice,
    tags
  } = req.query;

  const filter = { isActive: true };

  if (search) {
    filter.$text = { $search: search };
  }
  if (category) filter.category = category;
  if (tags) filter.tags = { $in: tags.split(",") };

  if (minPrice || maxPrice) {
    filter["variants.price"] = {};
    if (minPrice) filter["variants.price"].$gte = Number(minPrice);
    if (maxPrice) filter["variants.price"].$lte = Number(maxPrice);
  }

  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.json(
    new ApiResponse(true, {
      items: products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  );
});

// Upload variant images to S3
exports.uploadProductImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { variantId } = req.body;

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  const variant = product.variants.id(variantId);
  if (!variant) throw new ApiError(404, "Variant not found");

  const urls = [];
  for (const file of req.files) {
    const url = await uploadToS3(file);
    urls.push(url);
    variant.images.push(url);
  }
  await product.save();

  res.json(
    new ApiResponse(true, { images: urls }, "Images uploaded successfully")
  );
});
