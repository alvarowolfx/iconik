const sharp = require( 'sharp' )

const getRoundedCorners = ( width, height ) => {
  const rx = width / 8
  return Buffer.from(
    `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" ry="${rx}"/></svg>`
  );
}


function ImageResizeTask( ctx, path, config, output, roundedCorners ) {
  return () => {
    let sharpTask = sharp( path )
      .resize( config.size, config.size )
    if ( roundedCorners ) {
      const mask = getRoundedCorners( config.size, config.size )
      sharpTask = sharpTask.composite( [ { input : mask, blend : 'dest-in' } ] )
    }
    return sharpTask.png().toFile( `${output}/${config.name}.png` )
  }
}

module.exports = ImageResizeTask
