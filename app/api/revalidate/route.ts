import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: { current?: string }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Firma inválida' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Payload sin _type' }, { status: 400 })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, type: body._type, slug: body.slug?.current ?? null })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidando', error: `${err}` }, { status: 500 })
  }
}
