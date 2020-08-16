import { Request, Response, json } from "express";
import bcrypt, { genSaltSync } from "bcrypt";
import knex from "../database/connection";
import connection from "../database/connection";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import authConfig from "../config/auth.json";

interface userData {
  id: Number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  adminPermission: number;
}

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, cpf, birthDate } = req.body;

    const userAlreadyExists = await knex("users").where("email", email);

    if (userAlreadyExists.length !== 0)
      return res.status(409).send({
        email: "Email already in use.",
      });

    try {
      bcrypt.hash(password, genSaltSync(), async (err, hash) => {
        const [id] = await connection("users").insert({
          name,
          email,
          password: hash,
          cpf,
          birth_date: birthDate,
        });

        // Confirmation email to be done.
        return res.json({
          token: generateToken({ id }, authConfig.secret),
          userData: {
            name,
            email,
            adminPermission: false,
          },
        });
      });
    } catch (err) {
      throw new AppError("Server error", 400);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await connection<userData>("users").where(
      "email",
      email
    );

    if (userExists.length === 0)
      return res.status(409).send({
        email: "Email not registered.",
      });

    const {
      id,
      name,
      password: passwordHashed,
      adminPermission,
    } = userExists[0];

    if (!(await bcrypt.compare(password, passwordHashed)))
      return res.status(409).send({
        password: "Incorrect password.",
      });

    return res.json({
      token: generateToken({ id }, authConfig.secret),
      userData: {
        name,
        email,
        adminPermission: adminPermission === 1 ? true : false,
      },
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.user;

    const data = await knex("users").where({ id }).first();

    res.send(data);
  }
}

function generateToken(params = {}, secret: string) {
  return jwt.sign(params, secret, {
    expiresIn: "3d",
  });
}

export default UserController;
