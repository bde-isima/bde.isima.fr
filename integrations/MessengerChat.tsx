import { useEffect } from "react"
import MessengerCustomerChat from "react-messenger-customer-chat"

export default function MessengerChat() {
  useEffect(() => () => document.getElementById("fb-root")?.remove())

  return (
    <MessengerCustomerChat
      pageId="913191802071318"
      appId="237417597136510"
      htmlRef="fb-msgr"
      language="fr_FR"
    />
  )
}
