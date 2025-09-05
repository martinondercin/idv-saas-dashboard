import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Pause, Play, Settings, Filter, Download, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const liveTransactions = [
  {
    id: "txn_live_001",
    timestamp: "2024-01-22 15:42:33",
    userId: "usr_98765",
    type: "Full Identity Verification",
    status: "Processing",
    country: "US",
    riskScore: 25,
    stage: "Document Analysis"
  },
  {
    id: "txn_live_002", 
    timestamp: "2024-01-22 15:42:31",
    userId: "usr_54321",
    type: "Age Verification",
    status: "Completed",
    country: "GB",
    riskScore: 15,
    stage: "Final Review"
  },
  {
    id: "txn_live_003",
    timestamp: "2024-01-22 15:42:28",
    userId: "usr_13579",
    type: "OCR", 
    status: "Failed",
    country: "DE",
    riskScore: 85,
    stage: "Quality Check"
  },
  {
    id: "txn_live_004",
    timestamp: "2024-01-22 15:42:26",
    userId: "usr_24680",
    type: "Passive Liveness Check",
    status: "Under Review",
    country: "FR",
    riskScore: 72,
    stage: "Manual Review"
  },
  {
    id: "txn_live_005",
    timestamp: "2024-01-22 15:42:23",
    userId: "usr_11223",
    type: "Full Identity Verification",
    status: "Completed",
    country: "CA", 
    riskScore: 18,
    stage: "Completed"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="default">Completed</Badge>;
    case "Processing":
      return <Badge variant="secondary">Processing</Badge>;
    case "Under Review":
      return <Badge variant="outline">Under Review</Badge>;
    case "Failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getRiskColor = (score: number) => {
  if (score < 30) return "text-green-600";
  if (score < 70) return "text-yellow-600"; 
  return "text-red-600";
};

export default function RealTimeFeed() {
  const [isLive, setIsLive] = useState(true);
  const [transactions, setTransactions] = useState(liveTransactions);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new transaction
      const newTransaction = {
        id: `txn_live_${Date.now()}`,
        timestamp: new Date().toLocaleString('sv-SE').replace(' ', ' '),
        userId: `usr_${Math.floor(Math.random() * 100000)}`,
        type: ["Full Identity Verification", "Age Verification", "Passive Liveness Check", "OCR"][Math.floor(Math.random() * 4)],
        status: ["Processing", "Completed", "Under Review", "Failed"][Math.floor(Math.random() * 4)],
        country: ["US", "GB", "DE", "FR", "CA", "AU"][Math.floor(Math.random() * 6)],
        riskScore: Math.floor(Math.random() * 100),
        stage: ["Document Analysis", "Face Match", "Liveness Detection", "Final Review", "Quality Check"][Math.floor(Math.random() * 5)]
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Real-time Transaction Feed</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">{isLive ? 'Live' : 'Paused'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {setIsLive(!isLive); setAutoRefresh(!autoRefresh);}}
          >
            {isLive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLive ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45/min</div>
            <p className="text-xs text-muted-foreground">Transactions per minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Depth</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Pending transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <p className="text-xs text-muted-foreground">Real-time average</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Feed Controls</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="identity">Full Identity Verification</SelectItem>
                  <SelectItem value="age">Age Verification</SelectItem>
                  <SelectItem value="liveness">Passive Liveness Check</SelectItem>
                  <SelectItem value="ocr">OCR</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                <label className="text-sm">Auto-refresh</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <label className="text-sm">Sound alerts</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch />
                <label className="text-sm">High-risk only</label>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Feed
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Live Transaction Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  index === 0 && autoRefresh ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground w-16">
                    {transaction.timestamp.split(' ')[1]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.userId} • {transaction.country} • {transaction.stage}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getRiskColor(transaction.riskScore)}`}>
                      Risk: {transaction.riskScore}
                    </p>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}