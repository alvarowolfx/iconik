const readChunk = require( 'read-chunk' )
const fileType = require( 'file-type' )

function CheckFiletypeTask( ctx, path ) {
  return () => {
    const buffer = readChunk.sync( path, 0, fileType.minimumBytes ); 
    const res = fileType( buffer )
    if ( res.mime !== 'image/png' ) {
      throw new Error( 'Icon should be a .png file.' )
    }
  }
}

module.exports = CheckFiletypeTask
