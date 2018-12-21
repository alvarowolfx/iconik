const sizeOf = require( 'image-size' )

function CheckImageSizeTask( ctx, path ) {
  return () => {
    const dimensions = sizeOf( path )
    if ( dimensions.width !== dimensions.height ) {
      throw new Error( 'Icon should have the same width and height.' )
    }

    if ( dimensions.width < 512 ) {
      throw new Error( 'Icon should have at least 512 by 512 pixels.' )
    }

    ctx.dimensions = dimensions
  }
}

module.exports = CheckImageSizeTask
