import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

const SECRET = process.env.JWT_SECRET;

// Input validation helper
function validateLoginInput(email, password) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!email || !password) return "Email and password are required";
  if (email.length > 254) return "Email too long";
  if (password.length > 128) return "Password too long";
  if (!emailRegex.test(email.trim())) return "Invalid email format";
  
  return null; // No errors
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate and sanitize input
    const validationError = validateLoginInput(email, password);
    if (validationError) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: sanitizedEmail } });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new jose.SignJWT({ id: user.id, email: user.email, name: user.name })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET));

    // Remove sensitive data from user response
    const { password: _, ...safeUser } = user;
    
    const response = NextResponse.json(
      { message: "User logged in", user: safeUser },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong! 😅" },
      { status: 500 }
    );
  }
}
