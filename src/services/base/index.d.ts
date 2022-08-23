export interface BaseRepositoryInterface {
  prefix: string
}

export interface DefaultRespositoryInterface<T> extends BaseRepositoryInterface {
  all(payload?: Record<string, any>): Promise<Array<Record<string, T>>>
  findById(id: string | number): Promise<T>
}
