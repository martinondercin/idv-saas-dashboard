import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  timestamp: string;
  customerId: string;
  flowType: string;
  status: 'success' | 'pending' | 'error' | 'manual-review';
  region: string;
  riskScore?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-2024-001234",
    timestamp: "2024-01-15 14:32:01",
    customerId: "CUST-789012",
    flowType: "Identity Verification",
    status: "success",
    region: "US-East",
    riskScore: 0.15
  },
  {
    id: "TXN-2024-001235", 
    timestamp: "2024-01-15 14:31:45",
    customerId: "CUST-789013",
    flowType: "Document Verification",
    status: "manual-review",
    region: "EU-West",
    riskScore: 0.85
  },
  {
    id: "TXN-2024-001236",
    timestamp: "2024-01-15 14:30:22",
    customerId: "CUST-789014", 
    flowType: "Liveness Check",
    status: "pending",
    region: "APAC",
    riskScore: 0.45
  },
  {
    id: "TXN-2024-001237",
    timestamp: "2024-01-15 14:29:08",
    customerId: "CUST-789015",
    flowType: "KYC Verification",
    status: "error",
    region: "US-West",
    riskScore: 0.95
  },
  {
    id: "TXN-2024-001238",
    timestamp: "2024-01-15 14:28:33",
    customerId: "CUST-789016",
    flowType: "Identity Verification", 
    status: "success",
    region: "EU-Central",
    riskScore: 0.12
  }
];

export function TransactionFeed() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [flowTypeFilter, setFlowTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-error-light text-error";
    if (score >= 0.5) return "bg-warning-light text-warning";
    return "bg-accent/10 text-accent";
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (statusFilter !== "all" && transaction.status !== statusFilter) return false;
    if (flowTypeFilter !== "all" && transaction.flowType !== flowTypeFilter) return false;
    if (regionFilter !== "all" && transaction.region !== regionFilter) return false;
    return true;
  });

  const uniqueFlowTypes = [...new Set(mockTransactions.map(t => t.flowType))];
  const uniqueRegions = [...new Set(mockTransactions.map(t => t.region))];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Real-time Transaction Feed</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="manual-review">Manual Review</SelectItem>
            </SelectContent>
          </Select>

          <Select value={flowTypeFilter} onValueChange={setFlowTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Flow Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Flow Types</SelectItem>
              {uniqueFlowTypes.map(flowType => (
                <SelectItem key={flowType} value={flowType}>{flowType}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Flow Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-sm">
                  {transaction.id}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {transaction.timestamp}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.customerId}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {transaction.flowType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status}>
                    {transaction.status.replace('-', ' ')}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-sm">
                  {transaction.region}
                </TableCell>
                <TableCell>
                  {transaction.riskScore && (
                    <Badge 
                      variant="outline" 
                      className={getRiskScoreColor(transaction.riskScore)}
                    >
                      {(transaction.riskScore * 100).toFixed(0)}%
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}