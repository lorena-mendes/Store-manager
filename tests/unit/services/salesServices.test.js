const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesMock = require('../mocks/sales.model.mock');
const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

describe('Sales Service', function () {
  it('Lista todas as vendas', async function () {
    // arrange - arranjo
    sinon.stub(salesModel, 'listAllSales').resolves(salesMock.sales);

    // act - ação
    const response = await salesService.listAllSales();

    // assert - aferir 
    expect(response.message).to.be.deep.equal(salesMock.sales)
  });

  it('Lista apenas a venda correspondente ao id informado', async function () {
    sinon.stub(salesModel, 'listSalesById').resolves(salesMock.sales[0]);

    const response = await salesService.listSalesById(1);

    expect(response.message).to.be.deep.equal(salesMock.sales[0]);
  });

  it('Recebe "Sale not found" com a busca por um id inválido', async function () {
    sinon.stub(salesModel, 'listSalesById').resolves([]);

    const invalidId = { type: true, message: 'Sale not found' };

    const response = await salesService.listSalesById(800);

    expect(response).to.be.deep.equal(invalidId);
  });

  it('Remove venda com sucesso pelo id', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(salesMock.sales[0]);
    const removed = { type: 204, message: '' };

    const response = await salesService.remove(1)

    expect(response).to.be.deep.equal(removed);
  });

  it('Recebe "Sale not found" quando tenta deletar uma venda por um id inválido', async function () {
    sinon.stub(salesModel, 'listSalesById').resolves([]);

    const invalidId = { type: 404, message: 'Sale not found' };

    const response = await salesService.remove(800)

    expect(response).to.be.deep.equal(invalidId);
  });

  it('Valida e cadastra venda com sucesso', async function () {
    const res = {};
    const req = {
      body: salesMock.newSales,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insertNewSale')
      .resolves({ type: null, message: salesMock.newSales });

    await salesController.savedNewSales(req, res);

    expect(res.status).to.have.been.calledWith(null);
    expect(res.json).to.have.been.calledWith(salesMock.newSales);

  });

  afterEach(function () {
    sinon.restore();
  });
});

