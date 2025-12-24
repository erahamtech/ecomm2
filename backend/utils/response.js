// exports.success = (res, data = null, message = 'OK', code = 200) =>
//     res.status(code).json({ success: true, message, data });


// exports.error = (res, message = 'Error', code = 500, error = null) =>
//     res.status(code).json({ success: false, message, error });

class ApiResponse {
  constructor(success = true, data = null, message = "OK") {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

module.exports = ApiResponse;
