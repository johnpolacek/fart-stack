import { Form } from "@remix-run/react"
import FormHeader from "./header"

export default function LogoutForm() {
  return (
    <Form method="post">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <FormHeader>Logout</FormHeader>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-6 shadow rounded-lg sm:px-10">
            <p className="pt-4 pb-6 text-center text-xl">Sure you want to logout?</p>
            <div className="space-y-6">
              <div className="flex py-4">
                <a href="/" className="pl-4 pr-6 py-2 text-indigo-600">
                  Cancel
                </a>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
