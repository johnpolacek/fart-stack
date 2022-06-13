import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"

import { useActionData, useLoaderData } from "@remix-run/react"
import { useCallback, useState } from "react"
import ResetPasswordForm from "~/components/forms/reset"

import * as firebaseRest from "~/firebase-rest"
import { checkSessionCookie } from "~/server/auth.server"
import { commitSession, getSession } from "~/sessions"
import { getRestConfig } from "~/server/firebase.server"

interface LoaderData {
  apiKey: string
  domain: string
}
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"))
  const { uid } = await checkSessionCookie(session)
  const headers = {
    "Set-Cookie": await commitSession(session),
  }
  if (uid) {
    return redirect("/", { headers })
  }
  const { apiKey, domain } = getRestConfig()
  return json<LoaderData>({ apiKey, domain }, { headers })
}

interface ActionData {
  error?: string
  verified?: boolean
}
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  try {
    const code = form.get("code")
    const formError = json({ error: "Please fill all fields!" }, { status: 400 })
    if (typeof code !== "string") {
      return formError
    }
  } catch (error) {
    console.error(error)
    return json<ActionData>({ error: String(error) }, { status: 401 })
  }
}

export default function Reset() {
  const [clientAction, setClientAction] = useState<ActionData>()
  const action = useActionData<ActionData>()
  const restConfig = useLoaderData<LoaderData>()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // To avoid rate limiting, we sign in client side if we can.
      const resetPassword = await firebaseRest.sendConfirmPasswordReset(
        {
          oobCode: event.currentTarget.code.value,
          newPassword: event.currentTarget.newPassword.value,
        },
        restConfig
      )
      if (firebaseRest.isError(resetPassword)) {
        setClientAction({ error: resetPassword.error.message })
        return
      } else {
        setClientAction({ verified: true })
        return
      }
    },
    [restConfig]
  )

  return (
    <div>
      {clientAction && clientAction.verified ? (
        <div>
          <p>Your password has been reset.</p>
          <p>
            Please{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in
            </a>
            .
          </p>
        </div>
      ) : (
        <ResetPasswordForm onSubmit={handleSubmit} error={clientAction?.error || action?.error} />
      )}
    </div>
  )
}
