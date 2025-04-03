    import { Request, Response } from "express";
    import prisma from "../prismaClient";
    import bcrypt from "bcryptjs";
    export const Login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!userExists) {
                return res.status(400).json({
                    message: "User does not exists with this email"
                })
            }

            // decrypt the password
            const comparePass = await bcrypt.compare(password, userExists.password)

            if (!comparePass) {
                return res.status(400).json({
                    message: "Invalid password"
                })
            }
            return res.status(200).json({
                message: "Login successful"
            })

        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong"
            })
        }
    }

    export const Signup = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const userExists = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (userExists) {
                return res.status(400).json({
                    message: "User already exists with this email"
                })
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword

                }
            })

            res.status(201).json({
                message: "User created successfully",
            })
        } catch (error) {
            console.log("Error while signing up", error)
            res.status(500).json({
                message: "Something went wrong"
            })
        }

    }