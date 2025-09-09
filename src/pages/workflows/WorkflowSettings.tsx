import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Play, 
  Pause, 
  Clock, 
  CheckCircle,
  Shield,
  Eye,
  FileText,
  Zap,
  Settings
} from "lucide-react";

const workflowTemplates = [
  {
    id: "full-kyc",
    name: "Full Identity Verification",
    description: "Complete identity verification with document capture, selfie, and liveness detection",
    icon: Shield,
    steps: ["Document capture", "Document validation", "Selfie", "Face match", "Liveness check"],
    estimatedTime: "60-90 seconds",
    status: "active"
  },
  {
    id: "age-verification",
    name: "Age Verification Flow", 
    description: "Quick age verification starting with selfie analysis and optional document check",
    icon: CheckCircle,
    steps: ["Selfie capture", "Age estimation", "Document verification (if needed)"],
    estimatedTime: "30-45 seconds",
    status: "active"
  },
  {
    id: "ocr-document",
    name: "OCR Document Reading",
    description: "Extract and validate document information for form auto-filling and data extraction",
    icon: FileText,
    steps: ["Document capture", "OCR text extraction", "Data validation"],
    estimatedTime: "15-30 seconds",
    status: "paused"
  },
  {
    id: "liveness-only",
    name: "Liveness Check Only",
    description: "Quick liveness detection for user authentication and session verification",
    icon: Eye,
    steps: ["Selfie capture", "Liveness detection"],
    estimatedTime: "10-15 seconds",
    status: "active"
  },
  {
    id: "kyc-compliance",
    name: "KYC Compliance Flow",
    description: "Full regulatory compliance verification with AML screening and watchlist checks",
    icon: Settings,
    steps: ["Identity verification", "AML screening", "Watchlist check", "Compliance review"],
    estimatedTime: "2-3 minutes",
    status: "inactive"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "text-green-600";
    case "paused": return "text-yellow-600"; 
    case "inactive": return "text-gray-400";
    default: return "text-gray-400";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Active";
    case "paused": return "Paused";
    case "inactive": return "Inactive";
    default: return "Unknown";
  }
};

const WorkflowCard = ({ template, onStatusChange }: { template: any, onStatusChange: (id: string, status: string) => void }) => {
  const Icon = template.icon;
  
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-primary/10`}>
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${getStatusColor(template.status)}`}>
              {getStatusText(template.status)}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Workflow Steps:</p>
            <div className="flex flex-wrap gap-1">
              {template.steps.map((step: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {step}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {template.estimatedTime}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Switch 
                checked={template.status === "active"}
                onCheckedChange={(checked) => 
                  onStatusChange(template.id, checked ? "active" : "inactive")
                }
              />
              <span className="text-sm">Active</span>
              
              {template.status === "active" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStatusChange(template.id, "paused")}
                >
                  <Pause className="h-3 w-3 mr-1" />
                  Pause
                </Button>
              )}
              
              {template.status === "paused" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStatusChange(template.id, "active")}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Resume
                </Button>
              )}
            </div>
            
            <Button size="sm">
              <Zap className="h-3 w-3 mr-1" />
              Activate Flow
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function WorkflowSettings() {
  const handleStatusChange = (id: string, newStatus: string) => {
    // Here you would update the workflow status
    console.log(`Updating workflow ${id} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Verification Workflows</h1>
          <p className="text-muted-foreground mt-1">Manage your identity verification flows</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflowTemplates.map((template) => (
          <WorkflowCard 
            key={template.id} 
            template={template} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}