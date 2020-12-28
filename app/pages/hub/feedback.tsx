import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Feedback from "app/components/hub/feedback/Feedback"

const FeedbackIndex: BlitzPage = () => {
  return (
    <Feedback />
  )
}

FeedbackIndex.getLayout = (page) => <Layout title="Feedback">{page}</Layout>

export default FeedbackIndex
