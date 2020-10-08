import { CashFlowModel } from '@/domain/models/cash-flow'
import { LoadCashFlowController } from './load-cash-flow-controller'
import { LoadCashFlow } from './load-cash-flow-protocols'
import MockDate from 'mockdate'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

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

const makeLoadCashFlow = (): LoadCashFlow => {
  class LoadCashFlowStub implements LoadCashFlow {
    async load (): Promise<CashFlowModel[]> {
      return await Promise.resolve(makeFakeCashFlow())
    }
  }
  return new LoadCashFlowStub()
}

interface SutTypes {
  sut: LoadCashFlowController
  loadCashFlowStub: LoadCashFlow
}

const makeSut = (): SutTypes => {
  const loadCashFlowStub = makeLoadCashFlow()
  const sut = new LoadCashFlowController(loadCashFlowStub)
  return {
    sut,
    loadCashFlowStub
  }
}

describe('LoadCashFlow Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadCashFlow', async () => {
    const { sut, loadCashFlowStub } = makeSut()
    const loadSpy = jest.spyOn(loadCashFlowStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeCashFlow()))
  })

  test('Should return 204 if there is no cashFlow on database', async () => {
    const { sut, loadCashFlowStub } = makeSut()
    jest.spyOn(loadCashFlowStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve(([]))))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCashFlow throws ', async () => {
    const { sut, loadCashFlowStub } = makeSut()
    jest.spyOn(loadCashFlowStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
