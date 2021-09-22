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
    // data format
    // {title: , dbmlData: , userId:}
    const { userId } = request.params;
    const {title, dbmlData} = request.body;
    try {
      const newDiagram = await db.Diagram.create(
        {
          userId,
          title,
          dbmlData,
        }
        ,{ returning: true , raw: true});
      console.log('Created new diagram ==========>');
      console.log(newDiagram);
      response.send(newDiagram);
    } catch (error) {
      console.log('!!! error in creating diagram', error);
    }
  };

  const update = async (request, response) => {
    // data format
    // {title: , dbmlData: , userId:}
    const {title, dbmlData} = request.body;
    const { diagramId } = request.params;
    try {
      const updatedDiagram = await db.Diagram.update(
        {
          title,
          dbmlData,
        },
        {
          where: { id: diagramId },
          returning: true,
          raw: true,
        });
      console.log('Updated diagram ==========>');
      console.log(updatedDiagram);
      response.send(updatedDiagram[1][0]);
    } catch (error) {
      console.log('!!! error in updating diagram', error);
    }
  };

    const destroy = async (request, response) => {
    const { diagramId } = request.params;
    try {
      const deletedDiagram = await db.Diagram.destroy(
        {
          where: { id: diagramId },
          returning: true,
        });
      console.log('Deleted diagram ==========>');
      console.log(deletedDiagram);
      response.end();
    } catch (error) {
      console.log('!!! error in deleting diagram', error);
    }
  };

  return {
    index,
    find,
    create,
    update,
    destroy,
  };
}
