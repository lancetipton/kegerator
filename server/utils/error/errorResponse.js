const isDev = process.env.NODE_ENV === 'development'

const errorResponse = (res, status=501, error='Internal server error') => (
  res.status(status).json({ status, error })
)

module.exports = {
  errorResponse
}