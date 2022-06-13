type Props = {
  error?: string | null
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function ResetPasswordForm({ error, onSubmit }: Props) {

  return (
    <form method="post" onSubmit={onSubmit}>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set New Password</h2>
        </div>

        <p className="my-4 text-center text-sm italic text-red-700">{error ? "Sorry, we could not log you in. Please check your credentials" : ""}</p>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white pt-8 pb-4 px-6 shadow rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex py-4">
                <a href="/" className="pl-4 pr-6 py-2 text-indigo-600">
                  Cancel
                </a>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
