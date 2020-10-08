import { LoadCashFlowRepository } from '@/data/protocols/db/cash-flow/load-cash-flow-repository'
import { DbLoadCashFlow } from '@/data/usecases/load-cash-flow/db-load-cash-flow'
import { CashFlowModel } from '@/domain/models/cash-flow'
import MockDate from 'mockdate'

const makeFakeCashFlow = (): CashFlowModel[] => {
  return ([{
    data: new Date(),
    id: 'any_id',
    categoria: {
      id: 'other_id',
      name: 'any_name'
    },
    tipo: 'any_tipo',
    valor: 123,
    descricao: 'any_descricao'
  },
  {
    data: new Date(),
    id: 'any_id2',
    categoria: {
      id: 'other_id2',
      name: 'any_name2'
    },
    tipo: 'any_tipo2',
    valor: 1234,
    descricao: 'any_descricao2'
  }]
  )
}

const makeLoadCashFlowRepository = (): LoadCashFlowRepository => {
  class LoadCashFlowRepositoryStub implements LoadCashFlowRepository {
    async loadAll (): Promise<CashFlowModel[]> {
      return await Promise.resolve(makeFakeCashFlow())
    }
  }
  return new LoadCashFlowRepositoryStub()
}

interface SutTypes {
  sut: DbLoadCashFlow
  loadCashFlowRepositoryStub: LoadCashFlowRepository

}

const makeSut = (): SutTypes => {
  const loadCashFlowRepositoryStub = makeLoadCashFlowRepository()
  const sut = new DbLoadCashFlow(loadCashFlowRepositoryStub)
  return {
    sut,
    loadCashFlowRepositoryStub
  }
}

describe('DbLoadCashFlow Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadCashFlowRepository', async () => {
    const { sut, loadCashFlowRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCashFlowRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of CashFlow on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.load()
    expect(httpResponse).toEqual(makeFakeCashFlow())
  })

  test('Should throw if LoadCashFlowRepository throws ', async () => {
    const { sut, loadCashFlowRepositoryStub } = makeSut()
    jest.spyOn(loadCashFlowRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
