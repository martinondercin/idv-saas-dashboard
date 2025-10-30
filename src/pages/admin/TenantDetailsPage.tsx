import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTenantById } from "@/lib/mockTenantData";
import { mapTenantStatusToBadge } from "@/lib/tenantHelpers";
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Mail, 
  Calendar, 
  Key, 
  Webhook, 
  Settings,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity
} from "lucide-react";

export default function TenantDetailsPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  
  const tenant = getTenantById(tenantId || "");

  if (!tenant) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/admin/tenants")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tenants
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Tenant not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const quotaPercentage = (tenant.quotas.used / tenant.quotas.monthlyVerifications) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/admin/tenants")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tenants
        </Button>
      </div>

      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{tenant.name}</CardTitle>
                <StatusBadge status={mapTenantStatusToBadge(tenant.status)} />
              </div>
              <CardDescription className="space-y-1">
                <p className="font-mono text-sm">{tenant.id}</p>
                <p className="text-xs">Slug: {tenant.slug}</p>
              </CardDescription>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-medium">{tenant.plan}</p>
              <p className="text-xs text-muted-foreground">Region: {tenant.region}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="text-sm font-medium">{tenant.contactEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Data Residency</p>
                <p className="text-sm font-medium">{tenant.dataResidency}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium">
                  {new Date(tenant.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Active Users</p>
                <p className="text-sm font-medium">{tenant.activeUsers}</p>
              </div>
            </div>
          </div>

          {tenant.riskFlags && tenant.riskFlags.length > 0 && (
            <div className="mt-4 p-3 border border-warning/20 bg-warning-light rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-warning">Risk Flags</p>
                  {tenant.riskFlags.map((flag, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">{flag}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="quotas">Quotas & Usage</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Verifications (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tenant.verifications24h.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {tenant.verifications30d.toLocaleString()} this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tenant.successRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tenant.apiKeys}</div>
                <p className="text-xs text-muted-foreground">
                  Active keys configured
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enabled Features</CardTitle>
              <CardDescription>Feature toggles for this tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {tenant.features.ocrEnabled ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">OCR (Document Reading)</p>
                      <p className="text-xs text-muted-foreground">Optical character recognition</p>
                    </div>
                  </div>
                  <StatusBadge status={tenant.features.ocrEnabled ? "success" : "expired"}>
                    {tenant.features.ocrEnabled ? "Enabled" : "Disabled"}
                  </StatusBadge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {tenant.features.faceMatchEnabled ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Face Match</p>
                      <p className="text-xs text-muted-foreground">Compare document photo to selfie</p>
                    </div>
                  </div>
                  <StatusBadge status={tenant.features.faceMatchEnabled ? "success" : "expired"}>
                    {tenant.features.faceMatchEnabled ? "Enabled" : "Disabled"}
                  </StatusBadge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {tenant.features.livenessEnabled ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">Liveness Detection</p>
                      <p className="text-xs text-muted-foreground">Prevent spoofing attacks</p>
                    </div>
                  </div>
                  <StatusBadge status={tenant.features.livenessEnabled ? "success" : "expired"}>
                    {tenant.features.livenessEnabled ? "Enabled" : "Disabled"}
                  </StatusBadge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {tenant.features.amlEnabled ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">AML Screening</p>
                      <p className="text-xs text-muted-foreground">Anti-money laundering checks</p>
                    </div>
                  </div>
                  <StatusBadge status={tenant.features.amlEnabled ? "success" : "expired"}>
                    {tenant.features.amlEnabled ? "Enabled" : "Disabled"}
                  </StatusBadge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Quota Usage</CardTitle>
              <CardDescription>
                {tenant.quotas.used.toLocaleString()} / {tenant.quotas.monthlyVerifications.toLocaleString()} verifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{quotaPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      quotaPercentage >= 90 ? "bg-error" : quotaPercentage >= 75 ? "bg-warning" : "bg-accent"
                    }`}
                    style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 pt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold">
                    {(tenant.quotas.monthlyVerifications - tenant.quotas.used).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Average Daily</p>
                  <p className="text-2xl font-bold">
                    {Math.round(tenant.quotas.used / 30).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>{tenant.apiKeys} active key(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                API key management would be displayed here in a full implementation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhooks
              </CardTitle>
              <CardDescription>
                {tenant.webhooks.length} configured webhook(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tenant.webhooks.length > 0 ? (
                <div className="space-y-2">
                  {tenant.webhooks.map((webhook, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <p className="font-mono text-sm">{webhook}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No webhooks configured</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
