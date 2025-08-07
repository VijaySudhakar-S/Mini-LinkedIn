// Not found handler
const notFound = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

// Error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack || err);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({ 
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack 
  });
};

module.exports = {
  notFound,
  errorHandler
};