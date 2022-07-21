export interface Hot {
  first: string
  second: number
  third?: any
  iconType: number
}

export interface Result {
  hots: Hot[]
}

export interface SearchHotRes {
  code: number
  result: Result
}
