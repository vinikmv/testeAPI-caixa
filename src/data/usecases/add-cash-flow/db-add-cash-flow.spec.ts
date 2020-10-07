import { AddCashFlowRepository, AddCashFlowParams } from './db-add-cash-flow-protocols'
import { DbAddCashFlow } from '@/data/usecases/add-cash-flow/db-add-cash-flow'
import faker from 'faker'

const makeAddCashFlowRepositoryStub = (): AddCashFlowRepository => {
  class AddCashFlowRepositoryStub implements AddCashFlowRepository {
    async add (cashData: AddCashFlowParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddCashFlowRepositoryStub()
}

const makeFakeCashData = (): AddCashFlowParams => ({
  categoria: {
    name: 'any_name'
  },
  tipo: 'any_tipo',
  valor: faker.random.number(),
  descricao: 'any_descricao'
})

interface SutTypes {
  sut: DbAddCashFlow
  addCashFlowRepositoryStub: AddCashFlowRepository
}

const makeSut = (): SutTypes => {
  const addCashFlowRepositoryStub = makeAddCashFlowRepositoryStub()
  const sut = new DbAddCashFlow(addCashFlowRepositoryStub)
  return {
    sut,
    addCashFlowRepositoryStub
  }
}

describe('DbAddCashFlow Usecase', () => {
  test('Should call AddCashFlowRepository with correct values ', async () => {
    const { sut, addCashFlowRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCashFlowRepositoryStub, 'add')
    const cashFlowData = makeFakeCashData()
    await sut.add(cashFlowData)
    expect(addSpy).toHaveBeenCalledWith(cashFlowData)
  })

  test('Should throw if AddCashFlowRepository throws ', async () => {
    const { sut, addCashFlowRepositoryStub } = makeSut()
    jest.spyOn(addCashFlowRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeCashData())
    await expect(promise).rejects.toThrow()
  })
})
