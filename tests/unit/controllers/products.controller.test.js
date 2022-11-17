// const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const productsService = require('../../../src/services/products.service');
const products = require('../mocks/products.model.mock');
const productsController = require('../../../src/controllers/products.controller');

describe('Products Controller', function () {
  it('É chamado com o status 200 e lista todos os produtos', async function () {
    // arrange - arranjo
    const req = { type: null };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listAllProducts').resolves({ type: null, message: products });

    // act - ação
    await productsController.gettAllProducts(req, res);

    // assert - aferir 
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('É chamado com o status 404 e retorna a mensagem "Product not found"', async function () {
    // arrange - arranjo
    const req = { params: {id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listProductsById').resolves({ type: 404, message: 'Product not found' });

    // act - ação
    await productsController.getProductsById(req, res);

    // assert - aferir 
    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledWith('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});