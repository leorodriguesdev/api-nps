import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRespository";

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const UserRepository = getCustomRepository(UsersRepository);

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

        return response.status(201).json(user);
    }
}

export { UserController };
