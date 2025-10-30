import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockTenants } from "@/lib/mockTenantData";
import { mapTenantStatusToBadge } from "@/lib/tenantHelpers";
import { Building2, Users, Activity, AlertTriangle, TrendingUp, Globe } from "lucide-react";

export default function AdminOverview() {
  const totalTenants = mockTenants.length;
  const activeTenants = mockTenants.filter(t => t.status === 'active').length;
  const suspendedTenants = mockTenants.filter(t => t.status === 'suspended').length;
  const trialTenants = mockTenants.filter(t => t.status === 'trial').length;
  
  const totalVerifications24h = mockTenants.reduce((sum, t) => sum + t.verifications24h, 0);
  const totalVerifications30d = mockTenants.reduce((sum, t) => sum + t.verifications30d, 0);
  const averageSuccessRate = (mockTenants.reduce((sum, t) => sum + t.successRate, 0) / totalTenants).toFixed(1);
  
  const tenantsWithRiskFlags = mockTenants.filter(t => t.riskFlags && t.riskFlags.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Global Admin Overview</h1>
        <p className="text-muted-foreground mt-2">
          Innovatrics platform-wide monitoring and control
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              {activeTenants} active, {trialTenants} trial, {suspendedTenants} suspended
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verifications (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVerifications24h.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalVerifications30d.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">
              Across all active tenants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantsWithRiskFlags.length}</div>
            <p className="text-xs text-muted-foreground">
              Tenants require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Tenant deployment across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['eu-central-1', 'us-east-1', 'us-west-2', 'ap-southeast-1'].map((region) => {
              const regionTenants = mockTenants.filter(t => t.region === region);
              const count = regionTenants.length;
              const verifications = regionTenants.reduce((sum, t) => sum + t.verifications24h, 0);
              
              return (
                <div key={region} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{region}</p>
                      <p className="text-xs text-muted-foreground">{count} tenant{count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{verifications.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">verifications/24h</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tenants Requiring Attention */}
      {tenantsWithRiskFlags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tenants Requiring Attention</CardTitle>
            <CardDescription>Active risk flags and issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tenantsWithRiskFlags.map((tenant) => (
                <div key={tenant.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{tenant.name}</p>
                      <StatusBadge status={mapTenantStatusToBadge(tenant.status)} />
                    </div>
                    <div className="space-y-1">
                      {tenant.riskFlags?.map((flag, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-warning" />
                          {flag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{tenant.region}</p>
                    <p>{tenant.plan}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>System status indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Gateway</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OCR Service</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Face Match</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Liveness Detection</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Message Queue</span>
                <StatusBadge status="success">Operational</StatusBadge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
