const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const products = require('../mocks/products.model.mock');
const connection = require('../../../src/db/connection');


describe('Products Model', function () {
  it('Lista todos os produtos', async function () {
    // arrange - arranjo
    sinon.stub(connection, 'execute').resolves([products]);

    // act - ação
    const response = await productsModel.listAllProducts();
    
    // assert - aferir 
    expect(response).to.be.deep.equal(products)
  });

  it('Lista apenas o produto correspondente ao id informado', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const response = await productsModel.listProductsById(1);

    expect(response).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
