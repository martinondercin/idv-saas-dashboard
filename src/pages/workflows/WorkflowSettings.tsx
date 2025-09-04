import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Zap, Shield, AlertCircle, Plus, Edit } from "lucide-react";

const riskRules = [
  {
    id: "rule_001",
    name: "Document Quality Check",
    type: "Document Verification",
    threshold: 85,
    action: "Approve",
    status: "Active",
    triggerCount: 1250
  },
  {
    id: "rule_002",
    name: "Face Match Confidence",
    type: "Biometric Verification",
    threshold: 90,
    action: "Manual Review",
    status: "Active",
    triggerCount: 89
  },
  {
    id: "rule_003",
    name: "Suspicious Activity Pattern",
    type: "Behavioral Analysis",
    threshold: 70,
    action: "Reject",
    status: "Active",
    triggerCount: 23
  },
];

const featureToggles = [
  { name: "Real-time Scoring", description: "Enable real-time risk scoring for transactions", enabled: true },
  { name: "Enhanced Liveness Detection", description: "Use advanced ML models for liveness detection", enabled: true },
  { name: "Document OCR Enhancement", description: "Enhanced OCR with confidence scoring", enabled: false },
  { name: "Behavioral Analytics", description: "Track user behavior patterns for fraud detection", enabled: true },
  { name: "Geolocation Validation", description: "Validate user location against document issuing country", enabled: false },
];

const getStatusBadge = (status: string) => {
  return status === "Active" ? 
    <Badge variant="default">Active</Badge> : 
    <Badge variant="secondary">Inactive</Badge>;
};

const getActionBadge = (action: string) => {
  switch (action) {
    case "Approve":
      return <Badge variant="default">Approve</Badge>;
    case "Manual Review":
      return <Badge variant="secondary">Manual Review</Badge>;
    case "Reject":
      return <Badge variant="destructive">Reject</Badge>;
    default:
      return <Badge variant="secondary">{action}</Badge>;
  }
};

export default function WorkflowSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workflow Settings</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </div>

      <Tabs defaultValue="risk-scoring" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risk-scoring">Risk Scoring</TabsTrigger>
          <TabsTrigger value="rule-sets">Rule Sets</TabsTrigger>
          <TabsTrigger value="features">Feature Toggles</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-scoring">
          <div className="grid gap-6">
            {/* Risk Score Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Score Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Low Risk Threshold (Auto Approve)</label>
                    <Slider defaultValue={[30]} max={100} step={1} className="w-full" />
                    <p className="text-xs text-muted-foreground">Scores below 30 will be automatically approved</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">High Risk Threshold (Manual Review)</label>
                    <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
                    <p className="text-xs text-muted-foreground">Scores above 70 will require manual review</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Critical Risk Threshold (Auto Reject)</label>
                    <Slider defaultValue={[90]} max={100} step={1} className="w-full" />
                    <p className="text-xs text-muted-foreground">Scores above 90 will be automatically rejected</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button>Save Configuration</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Weights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Document Quality</p>
                      <p className="text-sm text-muted-foreground">Weight in overall risk calculation</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[25]} max={100} step={1} className="w-32" />
                      <span className="text-sm font-mono w-12">25%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Face Match Confidence</p>
                      <p className="text-sm text-muted-foreground">Biometric verification accuracy</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[35]} max={100} step={1} className="w-32" />
                      <span className="text-sm font-mono w-12">35%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Liveness Detection</p>
                      <p className="text-sm text-muted-foreground">Anti-spoofing measures</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[20]} max={100} step={1} className="w-32" />
                      <span className="text-sm font-mono w-12">20%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Behavioral Analysis</p>
                      <p className="text-sm text-muted-foreground">User behavior patterns</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[20]} max={100} step={1} className="w-32" />
                      <span className="text-sm font-mono w-12">20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rule-sets">
          <Card>
            <CardHeader>
              <CardTitle>Active Rule Sets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Triggers (7 days)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.type}</TableCell>
                      <TableCell>{rule.threshold}%</TableCell>
                      <TableCell>{getActionBadge(rule.action)}</TableCell>
                      <TableCell>{getStatusBadge(rule.status)}</TableCell>
                      <TableCell>{rule.triggerCount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Feature Toggles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {featureToggles.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <Switch defaultChecked={feature.enabled} />
                </div>
              ))}
              
              <div className="flex gap-4 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  View Impact Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}