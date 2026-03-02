import { AuthRepository } from '../repository/AuthRepository';

export class SignInUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string) {
    return this.authRepo.signIn(email, password);
  }
}
