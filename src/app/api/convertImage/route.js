import sharp from 'sharp';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'No se ha encontrado la imagen' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Fallo al obtener la imagen');
    }

    const imageBuffer = await response.arrayBuffer();
    const webpBuffer = await sharp(Buffer.from(imageBuffer))
      .webp({ quality: 100, lossless: false })
      .toBuffer();

    return new Response(webpBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400',
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