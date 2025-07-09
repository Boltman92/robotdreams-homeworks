export class BrewService {
  static scope = "scoped";
  constructor(brewModel) {
    console.log(`brewModel initialized`);
    this.brewModel = brewModel;
  }

  getAll() {
    return this.brewModel.all();
  }

  getOne(id) {
    const brew = this.brewModel.find(id);
    if (!brew)
      throw Object.assign(new Error("Brew not found"), { status: 404 });
    return brew;
  }

  create(dto) {
    return this.brewModel.create(dto);
  }

  update(id, dto) {
    const brew = this.brewModel.update(id, dto);
    if (!brew)
      throw Object.assign(new Error("Brew not found"), { status: 404 });
    return brew;
  }

  delete(id) {
    if (!this.brewModel.remove(id))
      throw Object.assign(new Error("Brew not found"), { status: 404 });
  }
}
