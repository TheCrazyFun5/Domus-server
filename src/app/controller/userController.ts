import { Request, Response } from "express";
import userService from "../service/userService.js";
class userController {
  registration(req: Request, res: Response) {
    // console.log(tokenService.createdToken());
    res.status(200).json("некст");
  }

  async login(req: Request, res: Response) {
    let user = req.body;
    const token = await userService.login(user.login, user.pass);
    if (token) return res.status(200).json(token);
    res.status(400).json("иди нахуй");
  }
}

export default new userController();
