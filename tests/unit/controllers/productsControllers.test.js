// const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai)

const productsService = require('../../../src/services/products.service');
const { products, newProduct } = require('../mocks/products.model.mock');
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

  it('É chamado com o status 404', async function () {
    const req = { type: null };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listAllProducts').resolves({ type: 404 });

    await productsController.gettAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('É chamado com o status 200 e lista o produto correspondente ao id informado', async function () {
    // arrange - arranjo
    const req = { params: { id: 2} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listProductsById').resolves({ type: null, message: products.id });

    // act - ação
    await productsController.getProductsById(req, res);

    // assert - aferir 
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products.id);
  });

  it('É chamado com o status 404 e retorna a mensagem "Product not found"', async function () {
    const req = { params: { id: 1 }, body: {} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listProductsById').resolves({ type: 404, message: 'Product not found' });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Insere novos produtos', async function () {
    const req = { body: newProduct };
    const res = {};

    const result = [...products, { id: 4, ...newProduct }];
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertNewProduct').resolves({ type: null, message: result });

    await productsController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(result);
  });

  it('Tenta inserir novos produtos sem sucesso', async function () {
    const req = { body: newProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertNewProduct').resolves({ type: 404 });

    await productsController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Atualiza um produto pelo id', async function () {
    const req = { params: { id: 2}, body: products };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: 2 });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(2);
  });

  it('Tenta tualizar um produto pelo id sem sucesso', async function () {
    const req = { params: { id: 10 }, body: products };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves({ type: 404, message: 'Product not found' });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Remove um produto pelo id ', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'remove').resolves({ type: 204, message: '' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({ message: '' });
  });

  it('Tenta remove um produto pelo id sem sucesso', async function () {
    const req = { params: { id: 10 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'remove').resolves({ type: 404, message: 'Product not found' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});