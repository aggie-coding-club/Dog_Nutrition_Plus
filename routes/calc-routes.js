var express = require("express");
const functions = require("../lib/Calculator/calcmain");

var router = express.Router();

const userCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('auth/login');
  } else {
    next();
  }
}

router.get("/", userCheck, (req, res) => {
  res.render("../views/calculator/calculator.ejs");
})

router.get("/test", userCheck, (req, res) => {
  let backURL = req.header('Referer') || '/';
  functions.getNutrInfo(10030);
  res.redirect(backURL);
})

router.get('/test2', userCheck, (req, res) => {
  let backURL = req.header('Referer') || '/';

  functions.getNutrNumbers(numbers => {
    numbers.forEach(nutrNum => {
      // console.log(nutrNum)
      functions.nutExists(10030, nutrNum.Nutr_No, info => {
        console.log(info)
      })
    })
  })
  res.redirect(backURL)
})

module.exports = router;