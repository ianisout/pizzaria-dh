const { Router } = require("express");

const PizzaController = require("../controllers/PizzaController");
const verificarIdMiddleware = require("../middlewares/verificarId");

const router = Router();

router.get("/", async function(request, response) {
  const pizzas = await PizzaController.listarTodos();

  return response.render("pizzas", { pizzas, title: "Homepage" });
});

router.get("/cadastrar", (req, res) => {
  res.render("criarNovaPizza", { title: "Criar nova pizza"})
});

router.get("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = await PizzaController.buscarPizzaPeloId(id);
    return res.render("editarPizza", { pizza })
  } catch(err) {
    return res.status(400).json({ err });
  }
});

router.get("/:id", verificarIdMiddleware, PizzaController.buscarPizzaPeloId);

router.post("/", async function(request, response) {
  const { sabor, categoria, preco } = request.body;

  await PizzaController.criarUmaPizza(sabor, categoria, preco);

  response.status(201).redirect("/pizzas");
});

router.put('/:id', verificarIdMiddleware, async function (request, response) {
  try {
    const { id } = request.params;
    const { sabor, categoria, preco } = request.body;
  
    PizzaController.editarUmaPizza(id, sabor, categoria, preco);
  
    return response.redirect('/pizzas');
  } catch(err) {
    return res.status(400).json({ err });
  }
});

router.delete("/:id", verificarIdMiddleware, async function(request, response) {
  const { id } = request.params;

  await PizzaController.deletarUmaPizza(id);

  return response.redirect("/pizzas");
});

module.exports = router;
