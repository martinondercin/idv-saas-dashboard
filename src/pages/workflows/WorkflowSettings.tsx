import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Plus, 
  Edit, 
  Copy, 
  Play, 
  Pause, 
  Clock, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Globe, 
  FileText, 
  Eye, 
  Shield,
  Zap,
  AlertTriangle
} from "lucide-react";

// Predefined workflow templates
const workflowTemplates = [
  {
    id: "full-kyc",
    name: "Full Identity Verification",
    description: "Complete KYC verification with document + selfie + liveness check",
    useCase: "Account opening, high-value transactions",
    estimatedTime: "60-90 seconds",
    steps: ["Document capture", "Document validation", "Selfie", "Face match", "Liveness", "Decision"],
    isActive: true,
    usageCount: 1247,
    successRate: 94,
    avgDuration: "75s",
    status: "Active"
  },
  {
    id: "age-verification",
    name: "Age Verification Flow", 
    description: "Efficient age verification starting with selfie analysis",
    useCase: "Age-restricted services, gaming platforms",  
    estimatedTime: "30-45 seconds",
    steps: ["Selfie", "Age estimation", "Document (if needed)", "Age verification", "Decision"],
    isActive: true,
    usageCount: 89,
    successRate: 97,
    avgDuration: "38s",
    status: "Active"
  },
  {
    id: "ocr-document",
    name: "OCR Document Reading",
    description: "Extract and validate document information only", 
    useCase: "Form auto-filling, data extraction",
    estimatedTime: "15-30 seconds",
    steps: ["Document capture", "OCR extraction", "Data validation", "Decision"],
    isActive: false,
    usageCount: 234,
    successRate: 99,
    avgDuration: "22s",
    status: "Paused"
  },
  {
    id: "liveness-only",
    name: "Liveness Check Only",
    description: "Quick liveness detection for authentication",
    useCase: "Session verification, re-authentication", 
    estimatedTime: "10-15 seconds",
    steps: ["Selfie capture", "Liveness detection", "Decision"],
    isActive: true,
    usageCount: 23,
    successRate: 99,
    avgDuration: "12s", 
    status: "Active"
  },
  {
    id: "kyc-compliance",
    name: "KYC Compliance Flow",
    description: "Full compliance verification with AML screening",
    useCase: "Financial services, regulated industries",
    estimatedTime: "2-3 minutes", 
    steps: ["Full ID verification", "AML screening", "Watchlist check", "Manual review"],
    isActive: true,
    usageCount: 156,
    successRate: 91,
    avgDuration: "2.4m",
    status: "Active"
  }
];

// Analytics data
const workflowAnalytics = {
  totalVerifications: 12847,
  successRate: 95.2,
  avgCompletionTime: "1.2m",
  trend: "+12%",
  topCountries: ["US", "UK", "CA", "AU", "DE"]
};

// Rule sets data
const ruleSetData = [
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
  }
];

const featureToggles = [
  { name: "Real-time Scoring", description: "Enable real-time risk scoring for transactions", enabled: true },
  { name: "Enhanced Liveness Detection", description: "Use advanced ML models for liveness detection", enabled: true },
  { name: "Document OCR Enhancement", description: "Enhanced OCR with confidence scoring", enabled: false },
  { name: "Behavioral Analytics", description: "Track user behavior patterns for fraud detection", enabled: true },
  { name: "Geolocation Validation", description: "Validate user location against document issuing country", enabled: false },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-800 border-green-200">
        <Play className="h-3 w-3 mr-1" />
        Active
      </Badge>;
    case "Paused":  
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
        <Pause className="h-3 w-3 mr-1" />  
        Paused
      </Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
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

const WorkflowTemplateCard = ({ template }: { template: any }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
        {getStatusBadge(template.status)}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground">Use Case</p>
          <p className="font-medium">{template.useCase}</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Est. Time</p>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="font-medium">{template.estimatedTime}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{template.usageCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Uses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{template.successRate}%</div>
          <div className="text-xs text-muted-foreground">Success</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{template.avgDuration}</div>
          <div className="text-xs text-muted-foreground">Avg Time</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Configure {template.name}</DialogTitle>
              <DialogDescription>
                Customize workflow settings and integration parameters
              </DialogDescription>
            </DialogHeader>
            <ConfigurationModal template={template} />
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="sm">
          <Copy className="h-3 w-3 mr-1" />
          Copy
        </Button>
        
        <Button variant="outline" size="sm">
          <Eye className="h-3 w-3 mr-1" />
          Preview
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ConfigurationModal = ({ template }: { template: any }) => (
  <div className="space-y-6">
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="steps">Steps</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="integration">Integration</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input id="template-name" defaultValue={template.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={template.description} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="use-case">Use Case</Label>
            <Input id="use-case" defaultValue={template.useCase} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="steps" className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium">Verification Steps</h4>
          {template.steps.map((step: string, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Business Settings</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Geographic Restrictions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="allowlist">Allowlist Only</SelectItem>
                    <SelectItem value="blocklist">Block Specific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Document Types</Label>
                <div className="flex gap-2 flex-wrap">
                  {["Passport", "Driver's License", "ID Card", "Residence Permit"].map(doc => (
                    <Badge key={doc} variant="outline" className="cursor-pointer">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="integration" className="space-y-4">
        <div className="space-y-4">
          <h4 className="font-medium">Integration Settings</h4>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-api.com/webhook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="redirect-url">Success Redirect URL</Label>
              <Input id="redirect-url" placeholder="https://your-app.com/success" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error-url">Error Redirect URL</Label>
              <Input id="error-url" placeholder="https://your-app.com/error" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    
    <div className="flex justify-end gap-2 pt-4 border-t">
      <Button variant="outline">Cancel</Button>
      <Button>Save Configuration</Button>
    </div>
  </div>
);

export default function WorkflowSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workflow Settings</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="rule-sets">Rule Sets</TabsTrigger>
          <TabsTrigger value="features">Feature Toggles</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows">
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Verifications</p>
                      <p className="text-2xl font-bold">{workflowAnalytics.totalVerifications.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Last 7 days</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600">{workflowAnalytics.successRate}%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {workflowAnalytics.trend} from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                      <p className="text-2xl font-bold text-orange-600">{workflowAnalytics.avgCompletionTime}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Average time</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Top Regions</p>
                      <p className="text-2xl font-bold">{workflowAnalytics.topCountries.length}</p>
                    </div>
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Active countries</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Workflow Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Active Workflow Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workflowTemplates.map((template) => (
                    <WorkflowTemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Template Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {["Full Identity", "Age Verification", "OCR Only", "Liveness", "KYC Compliance", "Custom Template"].map((template, index) => (
                    <Button 
                      key={template}
                      variant={index === 5 ? "default" : "outline"} 
                      className="h-20 flex flex-col gap-2"
                    >
                      <Shield className="h-5 w-5" />
                      <span className="text-xs">{template}</span>
                    </Button>
                  ))}
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
                  {ruleSetData.map((rule) => (
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
                  <AlertTriangle className="h-4 w-4 mr-2" />
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