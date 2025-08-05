import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;
    
    // Generate unique nonce for this request (CSP security)
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    
    // Create CSP - relaxed for development, strict for production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const cspHeader = isDevelopment 
        ? `
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-analytics.com *.vercel-insights.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: *.vercel.app cdn.weatherapi.com;
            font-src 'self' data:;
            connect-src 'self' ws: wss: generativelanguage.googleapis.com;
            frame-ancestors 'none';
        `.replace(/\s{2,}/g, ' ').trim()
        : `
            default-src 'self';
            script-src 'self' 'unsafe-inline' *.vercel-analytics.com *.vercel-insights.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: *.vercel.app cdn.weatherapi.com *.vercel-analytics.com;
            font-src 'self' data:;
            connect-src 'self' *.vercel-analytics.com *.vercel-insights.com generativelanguage.googleapis.com;
            frame-ancestors 'none';
        `.replace(/\s{2,}/g, ' ').trim();

    // Helper function to add CSP header to any response
    const addSecurityHeaders = (response) => {
        response.headers.set('Content-Security-Policy', cspHeader);
        response.headers.set('X-Nonce', nonce); // Pass nonce to components if needed
        return response;
    };

    // Only log in development to prevent information disclosure
    if (process.env.NODE_ENV === 'development') {
        console.log("Middleware running on:", pathname);
    }

    if (pathname === "/") {
        return addSecurityHeaders(NextResponse.next());
    }

    if (pathname === "/login") {
        if (token) {
            try {
                await verifyAuth(token);
                return addSecurityHeaders(NextResponse.redirect(new URL("/dashboard", request.url)));
            } catch (error) {
                // Token validation failed - no logging to prevent information disclosure
            }
        }
        return addSecurityHeaders(NextResponse.next());
    }

    if (!token) {
        return addSecurityHeaders(NextResponse.redirect(new URL("/login", request.url)));
    }

    try {
        await verifyAuth(token);
        return addSecurityHeaders(NextResponse.next());
    } catch (error) {
        // Token validation failed - redirect to login without logging
        return addSecurityHeaders(NextResponse.redirect(new URL("/login", request.url)));
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
