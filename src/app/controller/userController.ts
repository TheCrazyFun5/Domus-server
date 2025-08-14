import { Request, Response } from "express";
class userController {
  registration(req: Request, res: Response) {
    // console.log(tokenService.createdToken());
    res.status(200).json("некст");
  }

  login(req: Request, res: Response) {}
}

export default new userController();
