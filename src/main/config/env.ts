export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/vcaixa-dev-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tKs2mSl@5s52M'
}
