import { KPICard } from "@/components/dashboard/KPICard";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Zap,
  Settings,
} from "lucide-react";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-32 bg-gradient-to-r from-primary via-secondary-vibrant to-primary-light overflow-hidden rounded-lg mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="relative h-full flex items-center px-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Identity Verification Dashboard
            </h1>
            <p className="text-white/90 text-sm">
              Monitor verification activity, manage configurations, and track performance metrics
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Success Rate"
          value="94.2%"
          change={{ value: 2.4, period: "last 7 days", type: "increase" }}
          icon={CheckCircle}
          description="Successful verifications"
        />
        <KPICard
          title="Avg Processing Time"
          value="2.3s"
          change={{ value: 0.8, period: "last 7 days", type: "decrease" }}
          icon={Clock}
          description="End-to-end processing"
        />
        <KPICard
          title="Manual Reviews"
          value="127"
          change={{ value: 15.2, period: "last 7 days", type: "increase" }}
          icon={AlertTriangle}
          description="Pending manual review"
        />
        <KPICard
          title="Daily Volume"
          value="8,429"
          change={{ value: 8.7, period: "yesterday", type: "increase" }}
          icon={TrendingUp}
          description="Transactions today"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Gateway</span>
              <Badge className="bg-success-light text-success">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">OCR Service</span>
              <Badge className="bg-success-light text-success">
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Liveness Detection</span>
              <Badge className="bg-warning-light text-warning">
                Degraded
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Webhook Delivery</span>
              <Badge className="bg-success-light text-success">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Review Queue (15)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Configure Webhooks
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-error flex-shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-medium">SLA Breach</p>
                  <p className="text-xs text-muted-foreground">
                    Manual review queue exceeding 24h SLA
                  </p>
                  <p className="text-xs text-muted-foreground">5 min ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-warning flex-shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-medium">High Failure Rate</p>
                  <p className="text-xs text-muted-foreground">
                    OCR service showing 15% failure rate
                  </p>
                  <p className="text-xs text-muted-foreground">12 min ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-success flex-shrink-0 mt-2" />
                <div>
                  <p className="text-sm font-medium">System Recovery</p>
                  <p className="text-xs text-muted-foreground">
                    Liveness service back to normal
                  </p>
                  <p className="text-xs text-muted-foreground">1h ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Feed */}
      <TransactionFeed />
    </div>
  );
}