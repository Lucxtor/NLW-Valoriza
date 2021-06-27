import { Repository, EntityRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
class ComplimentRepositories extends Repository<Compliment> {

}

export { ComplimentRepositories };