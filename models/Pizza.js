const { Pizza } = require('../database/models');

const PizzaModel = {
  findById: (id) => Pizza.findByPk(id),
  findAll: () => Pizza.findAll(),
  criarUmaPizza: ({ sabor, categoria, preco }) =>
    Pizza.create({ sabor, categoria, preco }),
  update: ({ id, sabor, categoria, preco }) =>
    Pizza.update(
      { sabor, categoria, preco },
      {
        where: { id: id },
      }
    ),
  destroy: (id) => Pizza.destroy({ where: { id } }),
};

module.exports = PizzaModel;
