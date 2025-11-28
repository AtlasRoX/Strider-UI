import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download, Share2 } from "lucide-react"

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="secondary" className="h-auto py-4 flex-col gap-2 hover-lift">
          <Plus className="h-5 w-5" />
          <span className="text-xs">Create</span>
        </Button>
        <Button variant="secondary" className="h-auto py-4 flex-col gap-2 hover-lift">
          <Upload className="h-5 w-5" />
          <span className="text-xs">Upload</span>
        </Button>
        <Button variant="secondary" className="h-auto py-4 flex-col gap-2 hover-lift">
          <Download className="h-5 w-5" />
          <span className="text-xs">Export</span>
        </Button>
        <Button variant="secondary" className="h-auto py-4 flex-col gap-2 hover-lift">
          <Share2 className="h-5 w-5" />
          <span className="text-xs">Share</span>
        </Button>
      </CardContent>
    </Card>
  )
}
