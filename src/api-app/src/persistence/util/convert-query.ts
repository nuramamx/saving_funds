import ProcedureResponseModel from "../models/stored-procedures/procedure-response-model";

const ConvertQuery = {
  get(data: ProcedureResponseModel[]): ProcedureResponseModel {
    if (data !== null && data !== undefined && data.length === 1)
      return data[0];
    else if (data !== null && data !== undefined && data.length > 1)
      return data[0];
    else
      throw new Error('[ConvertQuery]: El objeto de entrada no contiene datos.');
  }
};

export default ConvertQuery;