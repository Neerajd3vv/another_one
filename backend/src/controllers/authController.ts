import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { z } from "zod"

const ZodSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 of characters"),
})



export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const result = ZodSchema.safeParse({ email, password })

    if (!result.success) {
        res.status(400).json({
            message: result.error.format().password?._errors[0] || result.error.format().email?._errors[0]
        })
        return
    }


    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!userExists) {
            res.status(400).json({
                message: "User does not exists with this email"
            })
            return
        }

        // decrypt the password
        const comparePass = await bcrypt.compare(password, userExists.password)

        if (!comparePass) {
            res.status(400).json({
                message: "Invalid password"
            })
            return
        }
        res.status(200).json({
            message: "Login successful",
            user: userExists
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const Signup = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const result = ZodSchema.safeParse({ email, password })

    if (!result.success) {
        res.status(400).json({
            message: result.error.format().password?._errors[0] || result.error.format().email?._errors[0]
        })
        return
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (userExists) {
            res.status(400).json({
                message: "User already exists with this email"
            })
            return
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