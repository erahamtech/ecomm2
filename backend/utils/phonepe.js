const crypto = require("crypto");
const axios = require("axios");

const createPhonePeChecksum = (payloadBase64, apiEndpoint) => {
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  const stringToSign = payloadBase64 + apiEndpoint + saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
  return `${sha256}###${saltIndex}`;
};

const createPhonePeOrder = async (order) => {
  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantTransactionId: order._id.toString(),
    amount: Math.round(order.total * 100),
    redirectUrl: process.env.PHONEPE_REDIRECT_URL,
    callbackUrl: process.env.PHONEPE_CALLBACK_URL,
    mobileNumber: order.addressSnapshot.phone,
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");

  const apiEndpoint = "/pg/v1/pay";
  const checksum = createPhonePeChecksum(payloadBase64, apiEndpoint);

  const response = await axios.post(
    `${process.env.PHONEPE_BASE_URL}${apiEndpoint}`,
    { request: payloadBase64 },
    {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum
      }
    }
  );

  return response.data;
};

const verifyPhonePeWebhook = (req) => {
  // Verify signature using HASH sent by PhonePe – check their docs.
  // This is a placeholder. Ensure you validate x-verify / checksum.
  return true;
};

module.exports = {
  createPhonePeOrder,
  verifyPhonePeWebhook
};
