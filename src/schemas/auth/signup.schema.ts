import { z } from "zod";

export const signupSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, "Full name must be at least 2 characters")
            .max(100, "Full name must not exceed 100 characters"),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Invalid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must not exceed 72 characters")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter",
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter",
            )
            .regex(
                /[0-9]/,
                "Password must contain at least one number",
            )
            .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character",
            ),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),

        termsAccepted: z
            .boolean()
            .refine(
                (value) => value === true,
                "You must accept the Terms of Service and Privacy Policy",
            ),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        },
    );

export type SignupFormData = z.infer<typeof signupSchema>;