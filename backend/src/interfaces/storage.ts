export interface DBStorage<P> {
  getAll(): P[],
  add(value: P): void
}