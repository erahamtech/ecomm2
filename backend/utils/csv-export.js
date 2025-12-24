const Order = require("../models/order.model");

const exportOrdersCsv = async (from, to) => {
  const filter = {};
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const orders = await Order.find(filter).lean();

  const headers = [
    "OrderID",
    "User",
    "Total",
    "Status",
    "PaymentStatus",
    "CreatedAt"
  ];

  const rows = orders.map((o) => [
    o._id,
    o.user,
    o.total,
    o.status,
    o.paymentStatus,
    o.createdAt.toISOString()
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
};

module.exports = { exportOrdersCsv };
