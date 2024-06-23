import { useMutation } from 'react-query'

export function getResponseData(response: any, dataLoader = (res: ApiResponse) => res.data.data) {
  return dataLoader(response)
}

export default function queryWrapper(func: any, dataLoader: any) {
  return async ({ queryKey }: any) => {
    const res = await func(...queryKey.slice(1))

    return getResponseData(res, dataLoader)
  }
}

function makeCombinedCallback(defaultConfig: any, config: any, attr: any) {
  return (...data: any[]) => {
    defaultConfig && defaultConfig[attr] && defaultConfig[attr](...data)
    config && config[attr] && config[attr](...data)
  }
}

export function mergeDefaultAndCustomMutationConfig(
  defaultConfig: any,
  config: any,
  overrideDefaultConfig: any,
) {
  let combinedCallbacks = {
    onSuccess: config?.onSuccess,
    onError: config?.onError,
    onSettled: config?.onSettled,
    onMutate: config?.onMutate,
  }

  if (!overrideDefaultConfig) {
    combinedCallbacks = {
      onSuccess: makeCombinedCallback(defaultConfig, config, 'onSuccess'),
      onError: makeCombinedCallback(defaultConfig, config, 'onError'),
      onSettled: makeCombinedCallback(defaultConfig, config, 'onSettled'),
      onMutate: makeCombinedCallback(defaultConfig, config, 'onMutate'),
    }
  }

  return {
    ...defaultConfig,
    ...config,
    ...combinedCallbacks,
  }
}

export function mutationWrapper(func: any, defaultConfig?: any) {
  return function (config: any, overrideDefaultConfig: any) {
    const combinedConfig = mergeDefaultAndCustomMutationConfig(
      defaultConfig,
      config,
      overrideDefaultConfig,
    )

    return useMutation(func, combinedConfig)
  }
}
