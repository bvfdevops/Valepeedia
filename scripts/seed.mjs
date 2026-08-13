import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-08-01' })

const CATEGORIES = [
  { title: 'Investigación', slug: 'investigacion', description: 'Reportajes largos de investigación periodística.' },
  { title: 'Derechos humanos', slug: 'derechos-humanos', description: 'Coberturas sobre derechos humanos y justicia social.' },
  { title: 'Medio ambiente', slug: 'medio-ambiente', description: 'Crisis climática, recursos naturales y comunidades afectadas.' },
  { title: 'Sociedad', slug: 'sociedad', description: 'Historias de comunidad y vida cotidiana.' },
  { title: 'Cultura', slug: 'cultura', description: 'Arte, identidad y expresiones culturales.' },
  { title: 'Estilo de vida', slug: 'estilo-de-vida', description: 'Tendencias y crónicas de estilo de vida.' },
]

const ARTICLES = [
  {
    title: 'El agua que no llega: dentro de la crisis hídrica que golpea a las comunidades rurales',
    slug: 'el-agua-que-no-llega',
    deck: 'Un recorrido de tres meses por las zonas rurales donde el acceso al agua potable se ha vuelto un lujo, contado a través de las voces de quienes la esperan.',
    category: 'medio-ambiente',
    imageSeed: 'valepeedia-agua',
    readingTime: 8,
    featured: true,
  },
  {
    title: 'Las cuidadoras invisibles',
    slug: 'las-cuidadoras-invisibles',
    deck: 'Un vistazo a la carga silenciosa que asumen millones de mujeres cada día sin remuneración ni reconocimiento.',
    category: 'sociedad',
    imageSeed: 'valepeedia-cuidadoras',
    readingTime: 6,
    featured: false,
  },
  {
    title: 'Entre el barrio y el escenario',
    slug: 'entre-el-barrio-y-el-escenario',
    deck: 'Cómo una nueva generación de artistas urbanos resignifica la identidad cultural desde los márgenes de la ciudad.',
    category: 'cultura',
    imageSeed: 'valepeedia-arte',
    readingTime: 7,
    featured: false,
  },
  {
    title: 'Desconectar para reconectar',
    slug: 'desconectar-para-reconectar',
    deck: 'Cada vez más personas eligen destinos sin wifi ni cobertura para recuperar el descanso real.',
    category: 'estilo-de-vida',
    imageSeed: 'valepeedia-turismo',
    readingTime: 5,
    featured: false,
  },
  {
    title: 'Reportaje de ejemplo con video embebido',
    slug: 'reportaje-de-ejemplo-con-video',
    deck: 'Artículo de prueba para revisar cómo se ve un video embebido dentro del cuerpo de un reportaje.',
    category: 'investigacion',
    imageSeed: 'valepeedia-video-demo',
    readingTime: 4,
    featured: false,
    video: {
      url: 'https://www.youtube.com/watch?v=YE7VzlLtp-4',
      caption: 'Video de ejemplo (Big Buck Bunny, Blender Foundation) usado solo para probar el embebido.',
    },
  },
]

async function uploadCoverImage(seed, alt) {
  const res = await fetch(`https://picsum.photos/seed/${seed}/1200/700`)
  const arrayBuffer = await res.arrayBuffer()
  const asset = await client.assets.upload('image', Buffer.from(arrayBuffer), {
    filename: `${seed}.jpg`,
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
}

async function run() {
  console.log('Sembrando autor...')
  const author = await client.createIfNotExists({
    _id: 'author-valepeedia',
    _type: 'author',
    name: 'Valepeedia',
    slug: { _type: 'slug', current: 'valepeedia' },
    bio: 'Periodista independiente especializada en reportajes de investigación y crónica social. En los últimos años he cubierto temas de derechos humanos, medio ambiente y comunidades vulnerables para distintos medios digitales.',
  })

  console.log('Sembrando categorías...')
  const categoryIds = {}
  for (const c of CATEGORIES) {
    const id = `category-${c.slug}`
    await client.createIfNotExists({
      _id: id,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      description: c.description,
    })
    categoryIds[c.slug] = id
  }

  console.log('Sembrando reportajes de ejemplo...')
  let daysAgo = 0
  for (const a of ARTICLES) {
    const id = `article-${a.slug}`
    const coverImage = await uploadCoverImage(a.imageSeed, a.title)
    const publishedAt = new Date(Date.now() - daysAgo * 86400000).toISOString()
    daysAgo += 7

    const body = [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [{ _type: 'span', _key: 'introspan', text: a.deck }],
      },
    ]

    if (a.video) {
      body.push({
        _type: 'videoEmbed',
        _key: 'video',
        url: a.video.url,
        caption: a.video.caption,
      })
      body.push({
        _type: 'block',
        _key: 'afterVideo',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'afterVideoSpan',
            text: 'Párrafo de cierre debajo del video, para confirmar que el texto sigue fluyendo con normalidad después del embebido.',
          },
        ],
      })
    }

    await client.createIfNotExists({
      _id: id,
      _type: 'article',
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      deck: a.deck,
      coverImage,
      body,
      author: { _type: 'reference', _ref: author._id },
      category: { _type: 'reference', _ref: categoryIds[a.category] },
      publishedAt,
      readingTime: a.readingTime,
      featured: a.featured,
      status: 'published',
    })
    console.log(`  ✓ ${a.title}`)
  }

  console.log('Listo.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
