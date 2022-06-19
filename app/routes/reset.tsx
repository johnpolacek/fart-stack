import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { useSearchParams } from "@remix-run/react"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useCallback, useState } from "react"
import ResetPasswordForm from "~/components/forms/auth/reset"

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
  console.log({ request })
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
  console.log({ restConfig })
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.getAll("oobCode")[0]
  console.log(oobCode)
  if (typeof window !== "undefined") {
    console.log(window.location.search)
  }

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log("handleSubmit")
      if (oobCode) {
        // To avoid rate limiting, we sign in client side if we can.
        const resetPassword = await firebaseRest.sendConfirmPasswordReset(
          {
            oobCode: oobCode,
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
      } else {
        setClientAction({ error: "Reset code missing." })
      }
    },
    [restConfig, oobCode]
  )

  return (
    <div>
      {clientAction && clientAction.verified ? (
        <div className="text-center w-full py-8">
          <h3 className="font-bold text-2xl py-8">Your password has been reset</h3>
          <a
            href="/login"
            className="py-2 px-4 rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </a>
        </div>
      ) : (
        <ResetPasswordForm onSubmit={handleSubmit} error={clientAction?.error || action?.error} />
      )}
    </div>
  )
}
