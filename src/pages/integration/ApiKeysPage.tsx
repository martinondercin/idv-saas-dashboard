import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Plus, RotateCw, Trash2 } from "lucide-react";

const apiKeys = [
  { id: "ak_live_1", name: "Production API Key", environment: "Live", status: "Active", created: "2024-01-15", lastUsed: "2024-01-22" },
  { id: "ak_test_1", name: "Test Environment", environment: "Test", status: "Active", created: "2024-01-10", lastUsed: "2024-01-21" },
  { id: "ak_dev_1", name: "Development Key", environment: "Dev", status: "Inactive", created: "2024-01-05", lastUsed: "Never" },
];

const webhooks = [
  { id: "wh_1", url: "https://api.company.com/webhooks/verify", events: ["transaction.completed", "review.required"], status: "Active" },
  { id: "wh_2", url: "https://staging.company.com/webhooks", events: ["transaction.failed"], status: "Failed" },
];

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API Keys & Webhooks</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New API Key
        </Button>
      </div>

      <div className="grid gap-6">
        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key ID</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">{key.id}</TableCell>
                    <TableCell>
                      <Badge variant={key.environment === "Live" ? "default" : "secondary"}>
                        {key.environment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.status === "Active" ? "default" : "secondary"}>
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Webhooks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{webhook.url}</span>
                      <Badge variant={webhook.status === "Active" ? "default" : "destructive"}>
                        {webhook.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Test</Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Events: {webhook.events.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}