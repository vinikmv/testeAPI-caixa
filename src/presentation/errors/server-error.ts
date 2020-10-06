export class ServerError extends Error {
  constructor () {
    super('Erro inesperado. Tente novamente')
    this.name = 'ServerError'
  }
}
