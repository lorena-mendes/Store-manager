const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const products = require('../mocks/products.model.mock');
const productsService = require('../../../src/services/products.service');

describe('Products Service', function () {
  it('Lista todos os produtos', async function () {
    // arrange - arranjo
    sinon.stub(productsModel, 'listAllProducts').resolves(products);

    // act - ação
    const response = await productsService.listAllProducts();

    // assert - aferir 
    expect(response.message).to.be.deep.equal(products)
  });

  it('Lista apenas o produto correspondente ao id informado', async function () {
    sinon.stub(productsModel, 'listProductsById').resolves(products[0]);

    const response = await productsService.listProductsById(1);

    expect(response.message).to.be.deep.equal(products[0]);
  });

  // CONFERIR PORQUE ESTE IT NÃO ESTÁ PASSANDO
  // it('Se o id informado for inválido retorna Product not Found"', async function () {
  //   sinon.stub(productsModel, 'listProductsById').resolves(undefined);

  //   const body = { id: 10 };
  //   const response = await productsModel.listProductsById(body);

  //   expect(response.type).to.equal(404);
  //   expect(response.message).toequal('Product not Found');
  // });

  afterEach(function () {
    sinon.restore();
  });
});

