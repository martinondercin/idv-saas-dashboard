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

      {/* System Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Transaction Feed */}
      <TransactionFeed />
    </div>
  );
}