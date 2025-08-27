import rateLimit from 'express-rate-limit';
export  const limiterLogin = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, 
  message: 'try latter',
  standardHeaders: true, 
  legacyHeaders: false, 
});