import Head from 'next/head'

type PageTitleProps = {
  title?: string
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Head>
      <title>{title || 'BDE ISIMA'}</title>
    </Head>
  )
}
