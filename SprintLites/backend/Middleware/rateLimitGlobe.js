import rateLimit from 'express-rate-limit';
export  const GlobelLimit = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: 'try letter',
  standardHeaders: true, 
  legacyHeaders: false, 
});