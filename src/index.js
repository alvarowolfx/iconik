const { Command, flags } = require( '@oclif/command' )
const IconikTask = require( './IconikTask' )

class MainCommand extends Command {
  async run() {
    const { args, flags } = this.parse( MainCommand )
    const { icon } = args    
    const task = new IconikTask( icon, flags )
    return task.run()
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
  roundedCorners : flags.boolean( { char : 'c', default : false, description : 'add rounded corners' } ),  
  // Default flags
  version : flags.version( { char : 'v' } ),
  help : flags.help( { char : 'h' } ),
}

module.exports = MainCommand
