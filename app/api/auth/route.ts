import { NextResponse } from "next/server"

// Placeholder auth endpoint structure
export async function POST() {
  return NextResponse.json({
    message: "Auth endpoint ready",
    status: "ok",
  })
}

export async function GET() {
  return NextResponse.json({
    message: "Auth status endpoint",
    authenticated: false,
  })
}
