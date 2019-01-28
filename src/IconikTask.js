const ListR = require( 'listr' )

const CheckFiletypeTask = require( './tasks/CheckFileType' )
const CheckImageSizeTask = require( './tasks/CheckImageSize' )
const { CheckInput, CheckOutput } = require( './tasks/CheckInputOutput' )
const ImageResizeTask = require( './tasks/ImageResize' )

const templates = require( './iconsTemplate.json' )

const { iosIcons, androidIcons, appStoreIcon } = templates

class IconikTask {
  constructor( icon, { ios, android, output, roundedCorners } ) {
    this.icon = icon
    this.ios = ios
    this.android = android
    this.output = output
    this.roundedCorners = roundedCorners
  }

  async run() {
    const { ios, android, icon, output, roundedCorners } = this
    const generateAll = !ios && !android

    const tasks = new ListR( [
      {
        title : 'Check Input',
        task : CheckInput( icon )
      },
      {
        title : 'Image Check',
        task : ( ctx ) => {
          return new ListR( [
                  
            {
              title : 'Checking icon format',
              task : CheckFiletypeTask( ctx, icon )
            },
            {
              title : 'Checking icon size',
              task : CheckImageSizeTask( ctx, icon )
            }

          ], { concurrent : true } )
        }
      },
      {
        title : 'Check output',
        task : CheckOutput( output )
      },
      {
        title : 'Generate icons',
        task : ( ctx ) => {
          const icons = []
          const iconsTemplate = []
            .concat( ios || generateAll ? iosIcons : [] )
            .concat( android || generateAll ? androidIcons : [] )
          
          const genAppStoreIcon = ctx.dimensions >= 1024          
          if ( genAppStoreIcon && ( ios || generateAll ) ) {
            iconsTemplate.push( appStoreIcon )
          }

          iconsTemplate.forEach( ( icon ) => {
            const { name, factors, baseSize } = icon
            if ( factors ) {
              factors.forEach( ( factor ) => {
                const iconName = `${name}${baseSize}x${baseSize}@${factor}x`
                const size = baseSize * factor
                icons.push( {
                  name : iconName,
                  size,
                } )
              } )
            } else {
              icons.push( {
                name,
                size : baseSize
              } )
            }
          } )

          const resizeTasks = icons.map( ( config ) => {
            return {
              title : `Creating icon ${config.name}`,
              task : ImageResizeTask( ctx, icon, config, output, roundedCorners )
            }
          } )
          return new ListR( resizeTasks, { concurrent : true } )
        }
      }
    ] )    

    return tasks.run().catch( ( err ) => {
      console.error( err.message );
    } )
  }
}

module.exports = IconikTask
