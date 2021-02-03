const pathSource = './dev'
const pathBuild  = './docs'
const pathAssets = `${pathBuild}/assets`



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
    src:  `${pathSource}/img/**/*.{jpg,png,gif,svg}`,
    dest: `${pathAssets}/img/`,
  },

  fonts: {
    src:  `${pathSource}/fonts/**/*.*`,
    dest: `${pathAssets}/fonts/`,
  }

}
