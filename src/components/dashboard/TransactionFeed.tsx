import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Eye, Download, Filter, Calendar, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isWithinInterval, subDays, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
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
  status: 'success' | 'pending' | 'error' | 'manual-review' | 'accepted' | 'rejected';
  region: string;
  riskScore?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-2024-001234",
    timestamp: "2024-01-15 14:32:01",
    customerId: "CUST-789012",
    flowType: "Identity Verification",
    status: "accepted",
    region: "US-East",
    riskScore: 0.15
  },
  {
    id: "TXN-2024-001235", 
    timestamp: "2024-01-14 16:31:45",
    customerId: "CUST-789013",
    flowType: "Document Verification",
    status: "manual-review",
    region: "EU-West",
    riskScore: 0.85
  },
  {
    id: "TXN-2024-001236",
    timestamp: "2024-01-13 09:30:22",
    customerId: "CUST-789014", 
    flowType: "Liveness Check",
    status: "pending",
    region: "APAC",
    riskScore: 0.45
  },
  {
    id: "TXN-2024-001237",
    timestamp: "2024-01-12 11:29:08",
    customerId: "CUST-789015",
    flowType: "KYC Verification",
    status: "rejected",
    region: "US-West",
    riskScore: 0.95
  },
  {
    id: "TXN-2024-001238",
    timestamp: "2024-01-11 08:28:33",
    customerId: "CUST-789016",
    flowType: "Identity Verification", 
    status: "accepted",
    region: "EU-Central",
    riskScore: 0.12
  },
  {
    id: "TXN-2024-001239",
    timestamp: "2024-01-10 13:45:12",
    customerId: "CUST-789017",
    flowType: "Document Verification",
    status: "rejected",
    region: "US-East",
    riskScore: 0.88
  },
  {
    id: "TXN-2024-001240",
    timestamp: "2024-01-09 10:15:33",
    customerId: "CUST-789018",
    flowType: "Biometric Verification",
    status: "accepted",
    region: "APAC",
    riskScore: 0.22
  },
  {
    id: "TXN-2024-001241",
    timestamp: "2024-01-08 15:22:44",
    customerId: "CUST-789019",
    flowType: "Address Verification",
    status: "error",
    region: "EU-West",
    riskScore: 0.67
  }
];

// Sandbox test data with different patterns
const sandboxTransactions: Transaction[] = [
  {
    id: "SBX-TEST-001",
    timestamp: "2024-01-15 10:00:00",
    customerId: "TEST-USER-001",
    flowType: "Identity Verification",
    status: "accepted",
    region: "TEST-ENV",
    riskScore: 0.05
  },
  {
    id: "SBX-TEST-002", 
    timestamp: "2024-01-15 10:05:00",
    customerId: "TEST-USER-002",
    flowType: "Document Verification",
    status: "pending",
    region: "TEST-ENV",
    riskScore: 0.25
  },
  {
    id: "SBX-TEST-003",
    timestamp: "2024-01-15 10:10:00",
    customerId: "TEST-USER-003", 
    flowType: "Liveness Check",
    status: "manual-review",
    region: "TEST-ENV",
    riskScore: 0.55
  },
  {
    id: "SBX-TEST-004",
    timestamp: "2024-01-15 10:15:00",
    customerId: "TEST-USER-004",
    flowType: "KYC Verification",
    status: "error",
    region: "TEST-ENV",
    riskScore: 0.75
  },
  {
    id: "SBX-TEST-005",
    timestamp: "2024-01-15 10:20:00",
    customerId: "TEST-USER-005",
    flowType: "Identity Verification", 
    status: "rejected",
    region: "TEST-ENV",
    riskScore: 0.95
  }
];

export function TransactionFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [flowTypeFilter, setFlowTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [timePeriodFilter, setTimePeriodFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentEnvironment, setCurrentEnvironment] = useState("production");

  // Check environment on mount and listen for changes
  useEffect(() => {
    const storedEnv = localStorage.getItem('environment') || 'production';
    setCurrentEnvironment(storedEnv);

    // Listen for environment changes (from TopBar)
    const handleStorageChange = () => {
      const newEnv = localStorage.getItem('environment') || 'production';
      setCurrentEnvironment(newEnv);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for same-tab changes
    const interval = setInterval(() => {
      const newEnv = localStorage.getItem('environment') || 'production';
      if (newEnv !== currentEnvironment) {
        setCurrentEnvironment(newEnv);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentEnvironment]);

  // Select appropriate data source based on environment
  const transactionData = currentEnvironment === 'sandbox' ? sandboxTransactions : mockTransactions;

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-error-light text-error";
    if (score >= 0.5) return "bg-warning-light text-warning";
    return "bg-accent/10 text-accent";
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'failed';
      default: return status as 'success' | 'pending' | 'error' | 'manual-review' | 'warning' | 'processing' | 'completed' | 'failed' | 'expired';
    }
  };

  const isTransactionInTimeRange = (transactionDate: string) => {
    const txDate = new Date(transactionDate);
    const now = new Date();
    
    switch (timePeriodFilter) {
      case "today":
        return isWithinInterval(txDate, { start: startOfDay(now), end: endOfDay(now) });
      case "week":
        return isWithinInterval(txDate, { start: subDays(now, 7), end: now });
      case "month":
        return isWithinInterval(txDate, { start: subDays(now, 30), end: now });
      case "custom":
        if (dateRange?.from && dateRange?.to) {
          return isWithinInterval(txDate, { 
            start: startOfDay(dateRange.from), 
            end: endOfDay(dateRange.to) 
          });
        }
        return true;
      case "all":
      default:
        return true;
    }
  };

  const filteredTransactions = transactionData.filter(transaction => {
    // Search filter - check multiple fields for the search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchLower) ||
        transaction.customerId.toLowerCase().includes(searchLower) ||
        transaction.flowType.toLowerCase().includes(searchLower) ||
        transaction.status.toLowerCase().includes(searchLower) ||
        transaction.region.toLowerCase().includes(searchLower) ||
        transaction.timestamp.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }
    
    if (statusFilter !== "all" && transaction.status !== statusFilter) return false;
    if (flowTypeFilter !== "all" && transaction.flowType !== flowTypeFilter) return false;
    if (regionFilter !== "all" && transaction.region !== regionFilter) return false;
    if (!isTransactionInTimeRange(transaction.timestamp)) return false;
    return true;
  });

  const uniqueFlowTypes: string[] = [...new Set(transactionData.map(t => t.flowType))];
  const uniqueRegions: string[] = [...new Set(transactionData.map(t => t.region))];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Real-time Transaction Feed 
            <Badge variant="outline" className="ml-2 text-xs">
              {currentEnvironment === 'sandbox' ? 'Sandbox' : 'Production'}
            </Badge>
          </CardTitle>
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
        
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Search Field */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
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
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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

          <Select value={timePeriodFilter} onValueChange={setTimePeriodFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {timePeriodFilter === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            )}
          </div>
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
                  <StatusBadge status={getStatusBadgeVariant(transaction.status)}>
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