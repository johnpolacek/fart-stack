interface RestError {
  error: {
    code: number
    message: string
    errors: any[]
  }
}

export const isError = (input: unknown): input is RestError => !!input && typeof input === "object" && "error" in input

// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
interface SignInWithPasswordResponse extends Response {
  json(): Promise<
    | RestError
    | {
        /**
         * A Firebase Auth ID token for the authenticated user.
         */
        idToken: string
        /**
         * The email for the authenticated user.
         */
        email: string
        /**
         * A Firebase Auth refresh token for the authenticated user.
         */
        refreshToken: string
        /**
         * The number of seconds in which the ID token expires.
         */
        expiresIn: string
        /**
         * The uid of the authenticated user.
         */
        localId: string
        /**
         * Whether the email is for an existing account.
         */
        registered: boolean
      }
  >
}

export const signInWithPassword = async (
  body: {
    email: string
    password: string
    returnSecureToken: true
  },
  restConfig: {
    apiKey: string
    domain: string
  }
) => {
  const response: SignInWithPasswordResponse = await fetch(`${restConfig!.domain}/v1/accounts:signInWithPassword?key=${restConfig!.apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}

// https://firebase.google.com/docs/reference/rest/auth#section-send-password-reset-email
interface SendPasswordResetEmailResponse extends Response {
  json(): Promise<
    | RestError
    | {
        /**
         * User's email address.
         */
        email: string
      }
  >
}

interface SendPasswordResetEmailResponse extends Response {
  json(): Promise<
    | RestError
    | {
        /**
         * User's email address.
         */
        email: string
        /**
         * Type of the email action code. Should be "PASSWORD_RESET".
         */
        requestType: string
      }
  >
}

export const sendPasswordResetEmail = async (
  body: {
    email: string
    requestType: string
  },
  restConfig: {
    apiKey: string
    domain: string
  }
) => {
  const response: SendPasswordResetEmailResponse = await fetch(`${restConfig!.domain}/v1/accounts:sendOobCode?key=${restConfig!.apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}

// https://firebase.google.com/docs/reference/rest/auth#section-confirm-reset-password
interface SendConfirmPasswordResetResponse extends Response {
  json(): Promise<
    | RestError
    | {
        /**
         * User's email address.
         */
        email: string
        /**
         * Type of the email action code. Should be "PASSWORD_RESET".
         */
        requestType: string
      }
  >
}

export const sendConfirmPasswordReset = async (
  body: {
    oobCode: string
    newPassword: string
  },
  restConfig: {
    apiKey: string
    domain: string
  }
) => {
  const response: SendConfirmPasswordResetResponse = await fetch(`${restConfig!.domain}/v1/accounts:resetPassword?key=${restConfig!.apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  return response.json()
}
