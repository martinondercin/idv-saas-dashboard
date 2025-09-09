import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { 
  User, 
  CreditCard, 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  Shield,
  Eye,
  Download,
  MessageSquare
} from "lucide-react";
import userSelfie from "@/assets/user-selfie.jpg";
import nationalIdFront from "@/assets/national-id-front.jpg";
import nationalIdBack from "@/assets/national-id-back.jpg";
import passport from "@/assets/passport.jpg";

const mockTransaction = {
  id: "TXN-2024-001234",
  userId: "USR-789456",
  userInfo: {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1-555-0123",
    verified: true,
    memberSince: "2022-03-15",
    riskProfile: "Low"
  },
  amount: 2500.00,
  currency: "USD",
  type: "Wire Transfer",
  status: "Under Review",
  riskScore: 75,
  timestamp: "2024-12-04 14:23:15",
  location: {
    country: "United States",
    city: "New York",
    ip: "192.168.1.100"
  },
  idDocument: {
    type: "National ID",
    frontImage: nationalIdFront,
    backImage: nationalIdBack,
    documentNumber: "123456789"
  },
  flags: [
    { type: "High Amount", severity: "Medium", description: "Transaction amount exceeds normal pattern" },
    { type: "New Location", severity: "Low", description: "Transaction from new geographic location" },
    { type: "Velocity Check", severity: "High", description: "Multiple transactions in short timeframe" }
  ],
  timeline: [
    { time: "14:23:15", event: "Transaction initiated", status: "success" },
    { time: "14:23:18", event: "Risk scoring completed", status: "warning" },
    { time: "14:23:20", event: "Flagged for manual review", status: "pending" },
    { time: "14:25:00", event: "Assigned to analyst", status: "info" }
  ]
};

const getRiskBadge = (score: number) => {
  if (score >= 80) return <Badge variant="destructive">High Risk</Badge>;
  if (score >= 50) return <Badge variant="secondary">Medium Risk</Badge>;
  return <Badge variant="outline">Low Risk</Badge>;
};

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Completed": "default",
    "Under Review": "secondary",
    "Failed": "destructive",
    "Pending": "outline"
  };
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

export default function TransactionDetails() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transaction Details</h1>
          <p className="text-muted-foreground">
            Comprehensive transaction analysis and review {id && `- Transaction ID: ${id}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transaction Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Transaction Overview
              </CardTitle>
              <CardDescription>Core transaction information and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{id || mockTransaction.id}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <p className="text-lg font-semibold">{mockTransaction.type}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  {getStatusBadge(mockTransaction.status)}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Risk Level</label>
                  {getRiskBadge(mockTransaction.riskScore)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="flags" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flags">Risk Flags</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="location">Location Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flags" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockTransaction.flags.map((flag, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{flag.type}</h4>
                        <Badge variant={flag.severity === "High" ? "destructive" : flag.severity === "Medium" ? "secondary" : "outline"}>
                          {flag.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{flag.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Processing Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTransaction.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'success' ? 'bg-accent' :
                        event.status === 'warning' ? 'bg-yellow-500' :
                        event.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Geographic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Country</label>
                    <p>{mockTransaction.location.country}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">City</label>
                    <p>{mockTransaction.location.city}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">IP Address</label>
                    <p className="font-mono text-sm">{mockTransaction.location.ip}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{mockTransaction.userInfo.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{mockTransaction.userInfo.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{mockTransaction.userInfo.phone}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                  <Badge variant={mockTransaction.userInfo.verified ? "default" : "destructive"}>
                    {mockTransaction.userInfo.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-sm">{mockTransaction.userInfo.memberSince}</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-32">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Selfie</label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer hover:opacity-80 transition-opacity">
                        <img 
                          src={userSelfie} 
                          alt="Identity verification selfie"
                          className="w-full h-40 rounded-lg object-cover border-2 border-muted hover:border-primary transition-colors bg-muted/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <img 
                        src={userSelfie} 
                        alt="Identity verification selfie - enlarged view"
                        className="w-full h-auto rounded-lg object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                ID Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                <p>{mockTransaction.idDocument.type}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Document Number</label>
                <p className="font-mono">{mockTransaction.idDocument.documentNumber}</p>
              </div>
              
              {/* Document Images */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Front Side</label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer hover:opacity-80 transition-opacity">
                        <img 
                          src={mockTransaction.idDocument.frontImage} 
                          alt="ID document front side"
                          className="w-full h-32 rounded-lg object-cover border-2 border-muted hover:border-primary transition-colors bg-muted/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img 
                        src={mockTransaction.idDocument.frontImage} 
                        alt="ID document front side - enlarged view"
                        className="w-full h-auto rounded-lg object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                {mockTransaction.idDocument.backImage && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Back Side</label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                          <img 
                            src={mockTransaction.idDocument.backImage} 
                            alt="ID document back side"
                            className="w-full h-32 rounded-lg object-cover border-2 border-muted hover:border-primary transition-colors bg-muted/20"
                          />
                          <p className="text-xs text-muted-foreground mt-1 text-center">Click to enlarge</p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img 
                          src={mockTransaction.idDocument.backImage} 
                          alt="ID document back side - enlarged view"
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full" 
                variant="default"
                onClick={() => {
                  console.log(`Approving transaction ${id}`);
                  // Handle approval logic
                }}
              >
                Approve Transaction
              </Button>
              <Button 
                className="w-full" 
                variant="destructive"
                onClick={() => {
                  console.log(`Rejecting transaction ${id}`);
                  // Handle rejection logic
                }}
              >
                Reject Transaction
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => {
                  console.log(`Escalating transaction ${id} to supervisor`);
                  // Handle escalation logic
                }}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate to Supervisor
              </Button>
              <Button className="w-full" variant="outline">
                Request More Info
              </Button>
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View User Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}