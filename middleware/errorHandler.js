// const constants = require("./constants");
// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;
//   switch (statusCode) {
//     case constants.VALIDATION_ERROR:
//       res.json({
//         title: "Validation",
//         message: res.error.message,
//         stackTrace: err.stack,
//       });
//     case constants.UNAUTHORIZED:
//       res.json({
//         title: "Unauthorized",
//         message: res.error.message,
//         stackTrace: err.stack,
//       });
//     case constants.FORBIDDEN:
//       res.json({
//         title: "Forbidden",
//         message: res.error.message,
//         stackTrace: err.stack,
//       });
//     case constants.NOT_FOUND:
//       res.json({
//         title: "Not Found",
//         message: res.error.message,
//         stackTrace: err.stack,
//       });
//     case constants.SERVER_ERROR:
//       res.json({
//         title: "Server Error",
//         message: res.error.message,
//         stackTrace: err.stack,
//       });

//     default:
//       console.log("No Error, All Good !");

//       break;
//   }
//   res.json({ message: res.error.message, stackTrace: err.stack });
// };
// export default errorHandler;
