// const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const salesService = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.model.mock');
const salesController = require('../../../src/controllers/sales.controller');

describe('Sales Controller', function () {
  it('É chamado com o status 200 e lista todas as vendas', async function () {
    // arrange - arranjo
    const req = { type: null };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'listAllSales').resolves({ type: null, message: salesMock.sales });

    // act - ação
    await salesController.gettAllSales(req, res);

    // assert - aferir 
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.sales);
  });

  it('É chamado com o status 404 e retorna a mensagem "Product not found"', async function () {
    // arrange - arranjo
    const req = { params: { id: 1 }, body: {} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'listSalesById').resolves({ type: 404, message: 'Product not found' });

    // act - ação
    await salesController.getSalesById(req, res);

    // assert - aferir 
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});