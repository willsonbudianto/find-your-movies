const UtilGetParam = (params: string): string | null => {
  try {
    return new URLSearchParams(window?.location?.search)?.get(params)
  } catch (e: any) {
    return null
  }
}

export default UtilGetParam
