export async function pipelineControllerFn(req, res) {
  console.log('Pipeline controller reached!');
  res.status(200).end();
};
