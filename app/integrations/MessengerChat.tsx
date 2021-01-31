import { useEffect } from "react"
import MessengerCustomerChat from "react-messenger-customer-chat"

export default function MessengerChat() {
  //On unmount, cleans up the messenger-chat from the DOM
  useEffect(() => () => document.getElementById("fb-root")?.remove())

  return (
    <MessengerCustomerChat
      style={{ zIndex: 999 }}
      pageId="913191802071318"
      appId="237417597136510"
      htmlRef="fb-msgr"
      language="fr_FR"
    />
  )
}
