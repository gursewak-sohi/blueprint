# Blueprint

## Features

- gulp
- Webpack
- Autoprefixer
- PostCSS
- Imagemin
- Browsersync

## Usage

Build locally and push files into production manually

### Using gulp to develop

#### 1 Install Node.js

[https://nodejs.org/](https://nodejs.org/)

Instead, the easiest way is using Homebrew.

```shell
$ brew install node
```

#### 2 Clone this repo into your WordPress theme directory

```shell
$ git clone git clone git@ && cd themename
```

#### 3. Install Node modules

```shell
$ npm install
```

#### 4. Change the site url

Change `exports.themeLocation` and `exports.urlToPreview` in `settings.js` for your environment to match your localhost environment.

#### 5. Run the package's start script

```shell
$ npm start
```

Or, if you have installed gulp globally, this is also available and is same as `npm start`.

```shell
$ gulp
```

### Configurations and Defaults

You can change the configuration by editing `settings.js`

#### tasks

Tasks to run when you exec `gulp watch` command.


##### watch

To watch files and run tasks on file changes.


##### img

The image directory.

default: `"assets/images"`  


##### js

The JavaScript destination directory for Webpack.

default: `"assets/js"`  


##### css

The CSS destination directory for postCSss.

default: `"assets/css"`  


#### autoprefixer

Autoprefixer settings.

## Notes



## Copyright / License


