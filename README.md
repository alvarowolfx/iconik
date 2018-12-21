# iconik - App Icon Generator

CLI tool for generating icons for iOS and Android apps.

The goal of the project is to generate the icons necessary, detect the project architeture (Native, React Native, Flutter, Cordova, etc) and setup all the icons accordingly.

### Goals

- [x] Generate icons in all needed sizes.
- [ ] Publish as NPM package.
- [ ] Detect project architecture.
- [ ] Setup icons files accordingly to the project architecture.  
- [ ] Add option to zip all icons.

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

### Running locally
```
$ ./bin/run ICON
```