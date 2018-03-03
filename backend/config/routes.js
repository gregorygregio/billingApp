const express = require('express')

module.exports = function(server) {

      const router = express.Router()
      server.use("/api/",router)

      const billingCycleService  = require("../api/billingCycle/billingCycleService")
      billingCycleService.register(router,"/billingCycles")

      const billingSummaryService = require('../api/billingSummary/billingSummaryService')
      router.route('/billingSummary').get(billingSummaryService.getSummary);

      const authService = require('../api/user/authService');
      router.route('/register').post( authService.register)
      router.route('/userlist').get( authService.listUsers)
      router.route('/login').post( authService.login)
}
