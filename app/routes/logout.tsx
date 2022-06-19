import type { LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import LogoutForm from "~/components/forms/auth/logout"

import { destroySession, getSession } from "~/sessions"

export const action: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"))
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  })
}

export default function Logout() {
  return (
    <div>
      <LogoutForm />
    </div>
  )
}
