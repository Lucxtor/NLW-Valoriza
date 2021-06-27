import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiveComplimentsController {

  async handle(request: Request, response: Response ) {
    const { user_id } = request;

    const listUserReceiverComplimentsService = new ListUserReceiverComplimentsService();

    const compliments = await listUserReceiverComplimentsService.execute(user_id);

    return response.json(compliments)
  }
}

export { ListUserReceiveComplimentsController };