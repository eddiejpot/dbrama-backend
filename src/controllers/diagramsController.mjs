export default function initDiagramsController(db) {
  const index = async (request, response) => {
    const { userId } = request.params;
    try {
      const allUserDiagrams = await db.Diagram.findAll(
        {
          where: {
            userId,
          },
        },
      );
      response.send({ allUserDiagrams });
    } catch (error) {
      console.log('!!! error in finding all diagrams', error);
    }
  };

  const find = async (request, response) => {
    const { diagramId } = request.params;
    try {
      const selectedDiagram = await db.Diagram.findByPk(diagramId);
      response.send({ selectedDiagram });
    } catch (error) {
      console.log('!!! error in finding single diagram', error);
    }
  };

  const create = async (request, response) => {
    // diagramData format
    // {diagramData: {title: , dbmlData: , userId:} }
    const { diagramData } = request.body;
    try {
      const newDiagram = await db.Diagram.create(diagramData, { returning: true });
      console.log('Created new diagram ==========>');
      console.log(newDiagram);
      response.end();
    } catch (error) {
      console.log('!!! error in creating diagram', error);
    }
  };

  const update = async (request, response) => {
    // diagramUpdateData format
    // {diagramUpdateData: {title: , dbmlData: , userId:} }
    const { diagramUpdateData } = request.body;
    const { diagramId } = request.params;
    try {
      const updatedDiagram = await db.Diagram.update(diagramUpdateData,
        {
          where: { id: diagramId },
          returning: true,
        });
      console.log('Updated diagram ==========>');
      console.log(updatedDiagram);
      response.end();
    } catch (error) {
      console.log('!!! error in updating diagram', error);
    }
  };

  return {
    index,
    find,
    create,
    update,
  };
}
