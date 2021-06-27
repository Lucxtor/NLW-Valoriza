import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password } : IAuthenticateRequest) {
    const UsersRepository = getCustomRepository(UsersRepositories);

    const user = await UsersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email
    }, "0816436692baec2d1b1c6d7a791da339", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;

  }
}

export { AuthenticateUserService }