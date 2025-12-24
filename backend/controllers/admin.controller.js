const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const ApiResponse = require("../utils/response");
const asyncHandler = require("../utils/async-handler");
const { exportOrdersCsv } = require("../utils/csv-export");

exports.getAnalytics = asyncHandler(async (req, res) => {
  const [revenueRes, userCount, orderCount, topProducts] = await Promise.all([
    Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$total" }
        }
      }
    ]),
    User.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          quantitySold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" }
    ])
  ]);

  const revenue = revenueRes[0]?.revenue || 0;

  res.json(
    new ApiResponse(true, {
      revenue,
      users: userCount,
      orders: orderCount,
      topProducts
    })
  );
});

exports.exportOrdersCsv = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const csv = await exportOrdersCsv(from, to);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=orders.csv");
  res.send(csv);
});
