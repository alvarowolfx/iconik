const sharp = require( 'sharp' )

function ImageResizeTask( ctx, path, config, output ) {
  return () => {
    return sharp( path )
      .resize( config.size, config.size )
      .png()
      .toFile( `./${output}/${config.name}.png` )    
  }
}

module.exports = ImageResizeTask
