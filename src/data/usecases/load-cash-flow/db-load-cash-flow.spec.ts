import { LoadCashFlowRepository } from '@/data/protocols/db/cash-flow/load-cash-flow-repository'
import { DbLoadCashFlow } from '@/data/usecases/load-cash-flow/db-load-cash-flow'
import { CashFlowModel } from '@/domain/models/cash-flow'

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
  test('Should call LoadCashFlowRepository', async () => {
    const { sut, loadCashFlowRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCashFlowRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
