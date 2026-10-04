import { createFileRoute } from '@tanstack/react-router'
import { pageInfo, paymentModes } from '#/components/fintech/data'
import { FintechPage } from '#/components/fintech/app'

export const Route = createFileRoute('/$page')({
  component: Page,
  head: ({ params }) => ({
    meta: [
      {
        title: `${pageInfo[params.page]?.title || paymentModes[params.page]?.title || params.page.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())} · Setlr`,
      },
    ],
  }),
})

function Page() {
  const { page } = Route.useParams()
  return <FintechPage key={page} page={page} />
}
