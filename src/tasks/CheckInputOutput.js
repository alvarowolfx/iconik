const fs = require( 'fs-extra' )

function CheckInput( path ) {
  return () => {
    if ( !fs.existsSync( path ) ) {
      throw new Error( "Input file doesn't exists." )
    }
  }
}

function CheckOutput( output ) {   
  return () => { 
    return fs.emptyDir( output )
  }
}

module.exports = {
  CheckInput,
  CheckOutput
}
