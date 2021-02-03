const pathSource = './dev'
const pathBuild  = './docs'
const pathAssets = `${pathBuild}/assets`

const favicon = './images/icon.png'



module.exports = {

  watchSource: pathSource,

  config: {
    text: {
      src:  `${pathSource}/config/*.txt`,
      dest: `${pathBuild}/`
    },
    hidden: {
      src:  `${pathSource}/config/*[!.txt]`,
      dest: `${pathBuild}/`
    }
  },

  themes: {
    src:  `./themes.json`,
    dest: `${pathBuild}/`
  },

  pug: {
    src:  `${pathSource}/pug/*.pug`,
    dest: `${pathBuild}/`,
    opts: {
      pug: {
        pretty: true
      }
    }
  },

  sass: {
    src:  `${pathSource}/scss/**/*.{scss,sass}`,
    dest: `${pathAssets}/css`,
    ext:  '.min.css',
    opts: {
      sass: {
        outputStyle: 'compressed'
      },
      autoprefixer: {
        cascade: false
      }
    }
  },

  js: {
    src:  `${pathSource}/js/**/*.js`,
    dest: `${pathAssets}/js/`,
    ext:  '.min.js',
    opts: {
      babel: {
        presets: ['@babel/preset-env']
      }
    }
  },

  images: {
    favicon:     favicon,
    faviconDest: `${pathBuild}/`,
    toConvert:   [`./images/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}`, `!${favicon}`],
    toCopy:      `./images/**/*.{gif,GIF,svg,SVG,webp,WEBP}`,
    dest:        `${pathAssets}/img/`,
  },

  fonts: {
    src:  `${pathSource}/fonts/**/*.*`,
    dest: `${pathAssets}/fonts/`,
  }

}
