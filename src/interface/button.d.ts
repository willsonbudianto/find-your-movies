interface ButtonProps extends OnClickProps, AdditionalClassProps {
  id?: string
  disabled?: boolean
  title: string | React.HTMLAttributes
  type?: button | submit
}
