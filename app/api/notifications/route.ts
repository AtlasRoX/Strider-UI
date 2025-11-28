import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Placeholder notification data - replace with DB queries when tables are set up
const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Export completed",
    message: "Your data export is ready for download",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Storage limit",
    message: "You've used 80% of your storage quota",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New feature",
    message: "Check out our new widget builder",
    time: "3 hours ago",
    read: true,
  },
]

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Replace with actual DB query when notifications table exists
    return NextResponse.json({ notifications: mockNotifications })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId, read } = body

    // TODO: Update notification in DB
    return NextResponse.json({ message: "Notification updated", id: notificationId, read })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get("id")

    // TODO: Delete notification from DB
    return NextResponse.json({ message: "Notification deleted", id: notificationId })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
