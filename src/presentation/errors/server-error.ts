export class ServerError extends Error {
  constructor (stack: string) {
    super('Erro inesperado. Tente novamente')
    this.name = 'ServerError'
    this.stack = stack
  }
}
