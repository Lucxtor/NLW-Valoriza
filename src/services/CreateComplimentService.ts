import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_reciver: string;
  message: string;
}

class CreateComplimentService {
  async execute( { tag_id, user_sender, user_reciver, message }: IComplimentRequest ) {
    const complimentRepositories = getCustomRepository(ComplimentRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(user_sender == user_reciver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReciverExists = await usersRepositories.findOne(user_reciver);

    if(!userReciverExists) {
      throw new Error("User Reciver does not exists!");
    }
  
    const compliment = complimentRepositories.create({
      tag_id,
      user_reciver,
      user_sender,
      message
    });

    await complimentRepositories.save(compliment);

    return compliment;

  }
}

export { CreateComplimentService };