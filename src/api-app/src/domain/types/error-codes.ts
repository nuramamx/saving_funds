enum ErrorCodes {
  API_CMD_HANDLER = "Error en el command handler asociado al recurso.",
  API_CMD_HANDLER_VALIDATION = "Error en el command handler asociado al recurso al realizar las validaciones.",
  API_CMD_HANDLER_DOMAIN = "Error en el command handler asociado al recurso al realizar el mapeo a dominio.",
  API_CMD_HANDLER_DATABASE = "Error en el command handler asociado al recurso al guardar en la base de datos.",
}

export default ErrorCodes;