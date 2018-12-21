# iconik - App Icon Generator

CLI tool for generating icons for iOS and Android apps.

The goal of the project is to generate the icons necessary, detect the project architeture (Native, React Native, Flutter, Cordova, etc) and setup all the icons accordingly.

### Goals

- [x] Generate icons in all needed sizes.
- [ ] Publish as NPM package.
- [ ] Detect project architecture.
- [ ] Setup icons files accordingly to the project architecture.  
- [ ] Add option to zip all icons.

### Install [Not Ready]
```
npm install -g iconik
or
npx iconik
```

### Usage
```
Generate app icons in all different sizes.

USAGE
  $ iconik ICON

ARGUMENTS
  ICON  input icon

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: icons] output folder
  -v, --version        show CLI version
  --android            generate android icons
  --ios                generate ios icons

DESCRIPTION
  Generate app icons in all different sizes.
  Please provide an icon with at least 512x512px.
```

### Example Output
```
$ iconik icon.png
  ✔ Check Input
  ✔ Image Check
  ✔ Check output
  ✔ Generate icons

$ ls icons
hdpi.png                       iPadSpotlight40x40@2x.png      iPhoneSettings29x29@2x.png     playStore.png
iPad76x76@2x.png               iPhone60x60@2x.png             iPhoneSettings29x29@3x.png     xhdpi.png
iPadNotification20x20@2x.png   iPhone60x60@3x.png             iPhoneSpotlight40x40@2x.png    xxhdpi.png
iPadPro83.5x83.5@2x.png        iPhoneNotification20x20@2x.png iPhoneSpotlight40x40@3x.png    xxxhdpi.png
iPadSettings29x29@2x.png       iPhoneNotification20x20@3x.png mdpi.png
```

### Running locally
```
$ ./bin/run ICON
```

### Credits

* [sharp](https://github.com/lovell/sharp) - Blazing fast image resize module. 
* [ocli](https://oclif.io) - Awesome CLI Framework.