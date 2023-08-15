/**
 * Manages what data is saved back to the Journey, adding addtional values
 * @param {object} state - information on the current configuration in the stepmanager
 * @return {object} payload updated for saving to journey builder
 */
module.exports = function (state) {
  const payload = state.payload;
  payload.arguments.execute.inArguments = [
    {
      //version: payload.metadata.version,
      config: state.config,
      configured: state.configured,
      interactionId: "{{Context.originalDefinitionId}}",
    },
  ];
  payload.arguments.execute.outArguments = [];
  payload.schema = {
    arguments: {
      execute: {
        inArguments: [
          {
            version: {
              dataType: "Text",
              isNullable: false,
              direction: "in",
            },
          },
          {
            config: {
              datatype: "Text",
              isNullable: false,
              direction: "in",
            },
          },
          {
            configured: {
              dataType: "Text",
              isNullable: false,
              direction: "in",
            },
          },
        ],
        outArguments: [],
      },
    },
  };
  return payload;
};
