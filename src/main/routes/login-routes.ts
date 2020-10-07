import { adaptRoute } from '@/main/adapter/express-route-adapter'
import { makeSignUpController } from '@/main/factories/login/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
