import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function GET(req) {  
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'No se ha encontrado la imagen' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const imageName = path.basename(url, path.extname(url)) + '.webp';
  const cachePath = path.join(process.cwd(), 'public/images/cache', imageName);

  if (fs.existsSync(cachePath)) {
    return new Response(fs.readFileSync(cachePath), {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Fallo al obtener la imagen');
    }

    const imageBuffer = await response.arrayBuffer();
    const image = sharp(Buffer.from(imageBuffer));

    const webpBuffer = await image
      .webp({ quality: 100, lossless: false })
      .toBuffer();

    fs.writeFileSync(cachePath, webpBuffer);

    return new Response(webpBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
      },
    });

  } catch (error) {
    console.error('Error convirtiendo a WebP:', error);
    return new Response(JSON.stringify({ error: 'Fallo al convertir la imagen' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}