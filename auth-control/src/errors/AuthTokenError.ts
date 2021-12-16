// permite diferenciar a instância do error

export class AuthTokenError extends Error {
  constructor() {
    super("Error with authentication token.");
  }
}
