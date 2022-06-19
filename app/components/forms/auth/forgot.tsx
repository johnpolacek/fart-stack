import FormHeader from "./header"

type Props = {
  error?: string | null
  sent?: boolean | null
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function ForgotPasswordForm({ error, sent, onSubmit }: Props) {
  return (
    <form method="post" onSubmit={onSubmit}>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <FormHeader>Forgot Password</FormHeader>

        {error && <p className="my-4 text-center text-sm italic text-red-700">Sorry, we could not log you in. Please check your credentials</p>}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="space-y-6">
              {sent ? (
                <div className="w-full text-center py-8">
                  <p className="font-bold text-2xl pb-4">Check your inbox</p>
                  <p className="text-gray-800 italic">Password reset email has been sent.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex pt-6 pb-4">
                    <a href="/" className="pl-4 pr-6 py-2 text-indigo-600">
                      Cancel
                    </a>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
