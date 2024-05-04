import { AnyFunction } from './../types/global'

function lazyLoad <F extends AnyFunction> (originalFunction: F, ...params: Parameters<F>): () => ReturnType<F> {
  let result: ReturnType<F> | null = null
  return () => {
    if (!result) {
      result = originalFunction(...params)
    }
    return result as ReturnType<F>
  }
}

export default lazyLoad
