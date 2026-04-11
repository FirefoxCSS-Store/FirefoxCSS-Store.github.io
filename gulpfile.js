const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { Transform } = require('stream')
const { finished } = require('stream/promises')
const {task, src, dest, parallel, series, watch} = require('gulp')


// general
const config = require('./gulpconfig.js')

// html
const pug    = require('gulp-pug')

// css
const sass   = require('gulp-sass')(require('sass'))

// js
const babel  = require('gulp-babel')
const terser = require('gulp-terser')

let autoprefixerPromise

function loadAutoprefixer () {
  if (!autoprefixerPromise) {
    autoprefixerPromise = import('gulp-autoprefixer').then(module => module.default)
  }

  return autoprefixerPromise
}

function renameFiles (transformPath) {
  return new Transform({
    objectMode: true,
    transform (file, enc, callback) {
      file.path = transformPath(file.path)
      callback(null, file)
    }
  })
}

function filterFiles (predicate) {
  return new Transform({
    objectMode: true,
    transform (file, enc, callback) {
      if (predicate(file)) {
        callback(null, file)
        return
      }

      callback()
    }
  })
}

function setExtension (filePath, extension) {
  const parsed = path.parse(filePath)
  return path.join(parsed.dir, `${parsed.name}${extension}`)
}

function toHiddenConfig (filePath) {
  const parsed = path.parse(filePath)
  return path.join(parsed.dir, `.${parsed.name}`)
}

function convertToWebp () {
  return new Transform({
    objectMode: true,
    transform (file, enc, callback) {
      if (file.isNull()) {
        callback(null, file)
        return
      }

      if (file.isStream()) {
        callback(new Error('Streaming image conversion is not supported'))
        return
      }

      sharp(file.path)
      .webp()
      .toBuffer()
      .then(buffer => {
        file.contents = buffer
        file.path = setExtension(file.path, '.webp')
        callback(null, file)
      })
      .catch(error => {
        callback(new Error(`${file.path}: ${error.message}`))
      })
    }
  })
}





task('configText', () => {
  return src(config.config.text.src)
  .pipe(dest(config.config.text.dest))
})

task('configHidden', () => {
  return src(config.config.hidden.src, { allowEmpty: true })
  .pipe(filterFiles(file => path.extname(file.path) !== '.txt'))
  .pipe(renameFiles(toHiddenConfig))
  .pipe(dest(config.config.hidden.dest))
})

task('config', parallel('configText', 'configHidden'))


task('themes', () => {
  return src(config.themes.src)
  .pipe(dest(config.themes.dest))
})



task('pug', () => {
  return src(config.pug.src)
  .pipe(pug(config.pug.opts.pug))
  .pipe(dest(config.pug.dest))
})



task('sass', async () => {
  const autoprefixer = await loadAutoprefixer()

  const stream = src(config.sass.src)
  .pipe(sass(config.sass.opts.sass).on('error', sass.logError))
  .pipe(autoprefixer(config.sass.opts.autoprefixer))
  .pipe(renameFiles(filePath => setExtension(filePath, config.sass.ext)))
  .pipe(dest(config.sass.dest))

  await finished(stream)
})



task('js', () => {
  return src(config.js.src)
  .pipe(babel(config.js.opts.babel))
  .pipe(dest(config.js.dest))
  .pipe(terser())
  .pipe(renameFiles(filePath => setExtension(filePath, config.js.ext)))
  .pipe(dest(config.js.dest))
})



task('convertImages', () => {
  return src(config.images.toConvert)
  .pipe(convertToWebp())
  .pipe(dest(config.images.dest))
})

task('copyImages', () => {
  return src(config.images.toCopy)
  .pipe(dest(config.images.dest))
})

task('copyFavicon', () => {
  return src(config.images.favicon)
  .pipe(dest(config.images.faviconDest))
})

task('images', parallel('convertImages', 'copyImages', 'copyFavicon'))



task('fonts', () => {
  const fontsPath = path.join(config.watchSource, 'fonts')

  if (!fs.existsSync(fontsPath)) {
    return Promise.resolve()
  }

  return src(config.fonts.src)
  .pipe(dest(config.fonts.dest))
})





task('default', parallel(
  'config',
  'pug',
  'sass',
  'js',
  'images',
  'fonts',
  'themes'
))



task('watchPug', () => { watch(`${config.watchSource}/pug/**/*`, series('pug')) })
task('watchSass', () => { watch(`${config.watchSource}/scss/**/*`, series('sass')) })
task('watchJS', () => { watch(`${config.watchSource}/js/**/*`, series('js')) })


task('watch', parallel(
  'watchPug',
  'watchSass',
  'watchJS'
))
