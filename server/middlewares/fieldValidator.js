import { validationResult, check } from 'express-validator';

export const fieldValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(
        (error) => error.msg
      ),
    });
  }

  next();
};


