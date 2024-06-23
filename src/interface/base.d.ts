interface ApiResponse {
  data: any
  errors: any
  message: string
  success: boolean
  results: any
  cast: any
  crew: any
}

interface AdditionalClassProps {
  additionalClass?: string
}

interface ChildrenProps {
  children?: React.ReactNode | React.ReactElement
}

interface OnClickProps {
  onClick?: (param?: any) => void
}

interface OnChangeProps {
  onChange?: (param?: any) => void
}

interface OnCloseProps {
  onClose?: (param?: any) => void
}
