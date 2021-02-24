import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const UserRepository = getRepository(User);

        const userAlfredyExists = await UserRepository.findOne({
            email
        });

        if (userAlfredyExists) {
            return response.status(400).json({
                error: "User already exists!",
            });
        }
        const user = UserRepository.create({
            name,
            email,
        });

        await UserRepository.save(user);

        return response.json(user);
    }
}

export { UserController }