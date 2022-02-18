exports.handlePSQLerr = (err, req, res, next) => {
  // PostgreSQL error codes used here:
  // 22P02 - invalid_text_representation
  // 23502 - not_null_violation
  // 23503 - foreign_key_violation
  const psqlErrorCodes = [
    "22P02",
    "23502",
    "23503"
  ]
  
  if (psqlErrorCodes.includes(err.code)) res.status(400).send({msg: "bad request"});
  else next(err);
}

exports.handleCustomErr = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({msg: err.msg});
  }
  else next(err);
}

exports.handle500err = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({msg: "server error"});
};
