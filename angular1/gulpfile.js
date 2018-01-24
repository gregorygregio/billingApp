const gulp = require('gulp')
const util = require('gulp-util')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

const sequence = require('run-sequence').use(gulp)


gulp.task('default',()=>{
  if(util.env.production){
    sequence('deps','app')
  }else{
    sequence('deps','app','server')
  }
})
