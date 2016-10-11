(function (global) {
  System.config({
    meta: {
    },
    paths: {
      // paths serve as alias
      'angular2:': '../scripts/libs/angular2/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: '../scripts',

      // angular bundles
      '@angular/core': 'angular2:core.umd.js',
      '@angular/common': 'angular2:common.umd.js',
      '@angular/compiler': 'angular2:compiler.umd.js',
      '@angular/platform-browser': 'angular2:platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'angular2:platform-browser-dynamic.umd.js',
      '@angular/http': 'angular2:http.umd.js',
      '@angular/router': 'angular2:router.umd.js',
      '@angular/forms': 'angular2:forms.umd.js',

      // other libraries
      'rxjs': '../scripts/libs/rxjs',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);