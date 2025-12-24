// Very simple version – you can extend with DB/IP-reputation
const blockedIPs = new Set();

module.exports = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;

  if (blockedIPs.has(ip)) {
    return res.status(403).json({
      success: false,
      message: "Access denied"
    });
  }
  next();
};
