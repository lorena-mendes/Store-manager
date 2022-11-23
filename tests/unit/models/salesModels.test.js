const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesMock = require('../mocks/sales.model.mock');
const connection = require('../../../src/db/connection');

describe('Sales Model', function () {
  it('Lista todos as vendas', async function () {
    // arrange - arranjo
    sinon.stub(connection, 'execute').resolves([salesMock.sales]);

    // act - ação
    const response = await salesModel.listAllSales();

    // assert - aferir 
    expect(response).to.be.deep.equal(salesMock.sales)
  });

  it('Lista apenas as vendas correspondente ao id informado', async function () {
    sinon.stub(connection, 'execute').resolves(salesMock.sales);

    const response = await salesModel.listSalesById(1);

    expect(response).to.be.deep.equal(salesMock.sales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});

