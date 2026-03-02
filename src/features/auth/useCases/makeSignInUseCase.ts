import { FirebaseAuthRepository } from '@/infra/firebase/repository/FirebaseAuthRepository';

import { SignInUseCase } from './signIn';

export function makeSignInUseCase() {
  const repo = new FirebaseAuthRepository();
  return new SignInUseCase(repo);
}
