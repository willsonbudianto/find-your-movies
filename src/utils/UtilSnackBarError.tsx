import { Toast, toast } from 'react-hot-toast'

export default function UtilSnackBarError(id: string, position: any, message?: string): void {
  toast(
    (t: Toast) => (
      <span onClick={() => toast.dismiss(t.id)}>
        {message || 'Something went wrong, please try again later...'}
      </span>
    ),
    {
      position,
      className: `${
        position === 'top-center' ? '!top-16' : '!bottom-16'
      } !bg-red-600 !cursor-pointer !p-1 !text-white !relative !text-sm !text-center`,
      duration: 5000,
      id,
    },
  )
}
