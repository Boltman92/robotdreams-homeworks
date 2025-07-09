export class BrewController {
  static scope = "scoped";
  constructor(brewService) {
    console.log(`BrewController initialized`);
    this.brewService = brewService;
  }

  index = (_req, res) => res.json(this.brewService.getAll());

  show = (req, res) => res.json(this.brewService.getOne(req.params.id));

  create = (req, res) =>
    res.status(201).json(this.brewService.create(req.body));

  update = (req, res) =>
    res.json(this.brewService.update(req.params.id, req.body));

  remove = (req, res) => {
    this.brewService.delete(req.params.id);
    res.status(204).end();
  };
}
