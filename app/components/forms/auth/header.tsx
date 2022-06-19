type Props = {
  children?: React.ReactNode;
}

export default function FormHeader({ children }: Props) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{children}</h2>
        </div>
  )
}
