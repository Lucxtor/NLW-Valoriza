import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {

  async handle(request: Request, response: Response) {
    const { tag_id,
      user_reciver,
      message } = request.body;
    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_reciver,
      user_sender: user_id,
      message
    })

    return response.json(compliment);
  }
}

export { CreateComplimentController };