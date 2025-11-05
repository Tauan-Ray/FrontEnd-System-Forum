export type ParamsRequest<T> = {
  _data: T,
  _meta: {
    _results: number,
    _total_results: number,
    _page: number,
    _total_page: number
  },
}

export type DefaultParamsResponse = {
  data?: any,
  status: number,
  message?: string,
  error?: any,
}