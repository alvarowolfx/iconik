const { Command, flags } = require( '@oclif/command' )

const ListR = require( 'listr' )

const CheckFiletypeTask = require( './tasks/CheckFileType' )
const CheckImageSizeTask = require( './tasks/CheckImageSize' )
const { CheckInput, CheckOutput } = require( './tasks/CheckInputOutput' )
const ImageResizeTask = require( './tasks/ImageResize' )

const templates = require( './iconsTemplate.json' )

const { iosIcons, androidIcons, appStoreIcon } = templates

class MainCommand extends Command {
  async run() {
    const { args, flags } = this.parse( MainCommand )
    const { icon } = args
    const { ios, android, output } = flags
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
              task : ImageResizeTask( ctx, icon, config, output )
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

MainCommand.description = `
Generate app icons in all different sizes.
Please provide an icon with at least 512x512px.
`

MainCommand.args = [  
  { name : 'icon', required : true, description : 'input icon' },  
]

MainCommand.flags = {  
  ios : flags.boolean( { default : false, description : 'generate only ios icons' } ),
  android : flags.boolean( { default : false, description : 'generate only android icons' } ),
  output : flags.string( { char : 'o', required : false, description : 'output folder', default : 'icons' } ),
  // Default flags
  version : flags.version( { char : 'v' } ),
  help : flags.help( { char : 'h' } ),
}

module.exports = MainCommand
