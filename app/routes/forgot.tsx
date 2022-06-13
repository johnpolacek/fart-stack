import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { useNavigate } from "react-router-dom"

import { useActionData, useLoaderData } from "@remix-run/react"
import { useCallback, useState } from "react"
import ForgotPasswordForm from "~/components/forms/forgot"

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
  redirect?: string
}
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  try {
    const email = form.get("email")
    const formError = json({ error: "Please fill all fields!" }, { status: 400 })
    if (typeof email !== "string") {
      return formError
    }
  } catch (error) {
    console.error(error)
    return json<ActionData>({ error: String(error) }, { status: 401 })
  }
}

export default function Forgot() {
  const [clientAction, setClientAction] = useState<ActionData>()
  const action = useActionData<ActionData>()
  const restConfig = useLoaderData<LoaderData>()
  let navigate = useNavigate()

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // To avoid rate limiting, we sign in client side if we can.
      const resetPassword = await firebaseRest.sendPasswordResetEmail(
        {
          email: event.currentTarget.email.value,
          requestType: "PASSWORD_RESET",
        },
        restConfig
      )
      if (firebaseRest.isError(resetPassword)) {
        setClientAction({ error: resetPassword.error.message })
        return
      } else {
        setClientAction({})
        navigate("/reset")
        return
      }
    },
    [restConfig, navigate]
  )

  return (
    <div>
      <ForgotPasswordForm onSubmit={handleSubmit} error={clientAction?.error || action?.error} />
    </div>
  )
}
