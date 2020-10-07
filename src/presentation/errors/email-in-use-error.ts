export class EmailInUseError extends Error {
  constructor () {
    super('Email já em uso.')
    this.name = 'EmailInUseError'
  }
}
