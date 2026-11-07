export function errorHandler(err, req,res,next){
    if(res.headersSent){
        return next(err);
    }
    console.error(err);
    const statusCode = err.statusCode || err.status || 500;
    const message = statusCode>= 500 ? "Internal Server Error" : err.message || "An error occurred";
    res.status(statusCode).json({
        success : false,
        message,
    });
}