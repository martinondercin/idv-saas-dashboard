import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Activity, Pause, Play, Settings, Filter, Download, RefreshCw, ChevronLeft, ChevronRight, CalendarIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format, isAfter, isBefore, isToday, isThisWeek, isThisMonth, parseISO } from "date-fns";

interface Transaction {
  id: string;
  sessionId: string;
  timestamp: string;
  name: string;
  userId: string;
  type: string;
  status: string;
  country: string;
  riskScore: number;
  stage: string;
  processingTime?: number; // in milliseconds
}

interface FilterState {
  type: string;
  status: string;
  timeRange: string;
  dateFrom?: Date;
  dateTo?: Date;
}

const liveTransactions: Transaction[] = [
  {
    id: "txn_live_001",
    sessionId: "sess_98765_001",
    timestamp: "2024-01-22 15:42:33",
    name: "John Smith",
    userId: "usr_98765",
    type: "Full Identity Verification",
    status: "Under Review",
    country: "US",
    riskScore: 25,
    stage: "Document Analysis"
  },
  {
    id: "txn_live_002",
    sessionId: "sess_54321_002", 
    timestamp: "2024-01-22 15:42:31",
    name: "Emma Johnson",
    userId: "usr_54321",
    type: "Age Verification",
    status: "Accepted",
    country: "GB",
    riskScore: 15,
    stage: "Final Review"
  },
  {
    id: "txn_live_003",
    sessionId: "sess_13579_003",
    timestamp: "2024-01-22 15:42:28",
    name: "Hans Mueller",
    userId: "usr_13579",
    type: "OCR", 
    status: "Rejected",
    country: "DE",
    riskScore: 85,
    stage: "Quality Check"
  },
  {
    id: "txn_live_004",
    sessionId: "sess_24680_004",
    timestamp: "2024-01-22 15:42:26",
    name: "Marie Dubois",
    userId: "usr_24680",
    type: "Passive Liveness Check",
    status: "Under Review",
    country: "FR",
    riskScore: 72,
    stage: "Manual Review"
  },
  {
    id: "txn_live_005",
    sessionId: "sess_11223_005",
    timestamp: "2024-01-22 15:42:23",
    name: "Sarah Wilson",
    userId: "usr_11223",
    type: "Full Identity Verification",
    status: "Accepted",
    country: "CA", 
    riskScore: 18,
    stage: "Final Review"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Accepted":
      return <Badge variant="success">Accepted</Badge>;
    case "Under Review":
      return <Badge variant="warning">Under Review</Badge>;
    case "Rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getRiskColor = (score: number) => {
  if (score < 30) return "text-accent";
  if (score < 70) return "text-yellow-600"; 
  return "text-red-600";
};

export default function RealTimeFeed() {
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>(liveTransactions);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    status: "all-status",
    timeRange: "all"
  });
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new transaction
      const names = ["Alex Morgan", "David Chen", "Lisa Garcia", "Michael Brown", "Sophie Anderson", "James Taylor"];
      const userId = Math.floor(Math.random() * 100000);
      const newTransaction: Transaction = {
        id: `txn_live_${Date.now()}`,
        sessionId: `sess_${userId}_${Date.now().toString().slice(-3)}`,
        timestamp: new Date().toLocaleString('sv-SE').replace(' ', ' '),
        name: names[Math.floor(Math.random() * names.length)],
        userId: `usr_${userId}`,
        type: ["Full Identity Verification", "Age Verification", "Passive Liveness Check", "OCR"][Math.floor(Math.random() * 4)],
        status: ["Under Review", "Accepted", "Rejected"][Math.floor(Math.random() * 3)],
        country: ["US", "GB", "DE", "FR", "CA", "AU"][Math.floor(Math.random() * 6)],
        riskScore: Math.floor(Math.random() * 100),
        stage: ["Document Analysis", "Face Match", "Liveness Detection", "Final Review", "Quality Check", "Manual Review"][Math.floor(Math.random() * 6)],
        processingTime: Math.floor(Math.random() * 5000) + 500 // 500ms - 5.5s
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 49)]); // Keep up to 50 transactions
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter transactions based on current filters
  useEffect(() => {
    let filtered = [...transactions];

    // Filter by type
    if (filters.type !== "all") {
      const typeMap: { [key: string]: string } = {
        identity: "Full Identity Verification",
        age: "Age Verification", 
        liveness: "Passive Liveness Check",
        ocr: "OCR"
      };
      filtered = filtered.filter(t => t.type === typeMap[filters.type]);
    }

    // Filter by status
    if (filters.status !== "all-status") {
      const statusMap: { [key: string]: string } = {
        "under-review": "Under Review",
        accepted: "Accepted",
        rejected: "Rejected"
      };
      filtered = filtered.filter(t => t.status === statusMap[filters.status]);
    }

    // Filter by time range
    if (filters.timeRange !== "all") {
      const now = new Date();
      filtered = filtered.filter(t => {
        const transactionDate = parseISO(t.timestamp.replace(' ', 'T'));
        
        switch (filters.timeRange) {
          case "today":
            return isToday(transactionDate);
          case "week":
            return isThisWeek(transactionDate);
          case "month":
            return isThisMonth(transactionDate);
          case "custom":
            if (filters.dateFrom && filters.dateTo) {
              return isAfter(transactionDate, filters.dateFrom) && isBefore(transactionDate, filters.dateTo);
            }
            return true;
          default:
            return true;
        }
      });
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [transactions, filters]);

  // Calculate statistics
  const stats = {
    total: filteredTransactions.length,
    successful: filteredTransactions.filter(t => t.status === "Accepted").length,
    failed: filteredTransactions.filter(t => t.status === "Rejected").length,
    underReview: filteredTransactions.filter(t => t.status === "Under Review").length,
    avgProcessingTime: filteredTransactions.reduce((acc, t) => acc + (t.processingTime || 0), 0) / (filteredTransactions.length || 1)
  };

  // Get transaction counts by type
  const typeCounts = {
    "Full Identity Verification": filteredTransactions.filter(t => t.type === "Full Identity Verification").length,
    "Age Verification": filteredTransactions.filter(t => t.type === "Age Verification").length, 
    "Passive Liveness Check": filteredTransactions.filter(t => t.type === "Passive Liveness Check").length,
    "OCR": filteredTransactions.filter(t => t.type === "OCR").length
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const displayedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Reset to first page when new transactions arrive
  useEffect(() => {
    if (autoRefresh && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [filteredTransactions.length, autoRefresh]); // Remove currentPage from dependencies to avoid infinite loop

  const handleFilterChange = (key: keyof FilterState, value: string | Date | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: "all",
      status: "all-status", 
      timeRange: "all"
    });
  };

  const exportData = () => {
    const csvContent = [
      ["Timestamp", "Type", "Name", "User ID", "Status", "Processing Time (ms)", "Risk Score", "Country", "Stage"].join(","),
      ...filteredTransactions.map(t => [
        t.timestamp,
        t.type,
        t.name,
        t.userId.replace("usr_", "user_"), // Anonymize user ID
        t.status,
        t.processingTime || "N/A",
        t.riskScore,
        t.country,
        t.stage
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-feed-${format(new Date(), "yyyy-MM-dd-HH-mm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Real-time Transaction Feed</h1>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-accent animate-pulse' : 'bg-error'}`} />
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

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Filtered results</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.successful}</div>
            <p className="text-xs text-muted-foreground">{stats.total > 0 ? Math.round((stats.successful / stats.total) * 100) : 0}% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">{stats.total > 0 ? Math.round((stats.failed / stats.total) * 100) : 0}% failure rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.underReview}</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stats.avgProcessingTime)}ms</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Type Counts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold">{typeCounts["Full Identity Verification"]}</div>
            <p className="text-sm text-muted-foreground">Full Identity Verifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold">{typeCounts["Age Verification"]}</div>
            <p className="text-sm text-muted-foreground">Age Verifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold">{typeCounts["Passive Liveness Check"]}</div>
            <p className="text-sm text-muted-foreground">Liveness Checks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold">{typeCounts["OCR"]}</div>
            <p className="text-sm text-muted-foreground">OCR Verifications</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Controls with Filtering */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Feed Controls & Filters</CardTitle>
            <div className="flex gap-2">
              <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
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
              <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.timeRange} onValueChange={(value) => handleFilterChange("timeRange", value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {filters.timeRange === "custom" && (
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">From Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={filters.dateFrom}
                                  onSelect={(date) => handleFilterChange("dateFrom", date)}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">To Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {filters.dateTo ? format(filters.dateTo, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={filters.dateTo}
                                  onSelect={(date) => handleFilterChange("dateTo", date)}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button onClick={clearFilters} variant="outline" className="flex-1">
                        Clear Filters
                      </Button>
                      <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {(filters.type !== "all" || filters.status !== "all-status" || filters.timeRange !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
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
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Feed ({filteredTransactions.length} records)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction list</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Workflow Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processing Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedTransactions.map((transaction, index) => (
                  <TableRow 
                    key={transaction.id}
                    className={cn(
                      "cursor-pointer hover:bg-muted/50",
                      index === 0 && autoRefresh && "bg-primary/5",
                      transaction.status === 'Rejected' && "bg-error/10 border-l-4 border-l-error hover:bg-error/15"
                    )}
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                  >
                    <TableCell className="font-medium">
                      {transaction.timestamp}
                    </TableCell>
                    <TableCell>
                      {transaction.type}
                    </TableCell>
                    <TableCell>
                      {transaction.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{transaction.userId.replace("usr_", "user_")}</div>
                        <div className="text-xs text-muted-foreground">{transaction.sessionId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {transaction.processingTime ? `${transaction.processingTime}ms` : "N/A"}
                        <div className="text-xs text-muted-foreground">{transaction.stage}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} filtered transactions
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {/* Show page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        className="w-8 h-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-center pt-2 text-xs text-muted-foreground">
            Page {currentPage} of {totalPages} • {filteredTransactions.length} filtered transactions • {transactions.length} total
          </div>
        </CardContent>
      </Card>
    </div>
  );
}