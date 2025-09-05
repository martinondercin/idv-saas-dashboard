import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, ExternalLink, Code, Settings, Globe } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IntegrationGuide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Integration Guide</h1>
        <Badge variant="outline">RIVaaS Service</Badge>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            What is RIVaaS?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Remote Identity Verification as a Service (RIVaaS) is a service allowing web platforms to verify 
            the identity of their users remotely without the need of complicated integration of Innovatrics' 
            identity verification toolkit - DOT. It is a web application that can be accessed either as a 
            standalone web application (via redirect) or as an iframe.
          </p>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Before integrating with RIVaaS, you need to contact Innovatrics representative and provide the following URLs:
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Required URLs</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>verifiedUrl (VERIFIED_URL)</strong> - URL to redirect after successful verification</li>
                  <li><strong>rejectedUrl (REJECTED_URL)</strong> - URL to redirect when verification is rejected/failed</li>
                  <li><strong>unverifiedUrl (UNVERIFIED_URL)</strong> - URL to redirect when verification is cancelled</li>
                  <li><strong>callbackUrl (CALLBACK_URL)</strong> - URL to receive sensitive information via webhook</li>
                  <li><strong>logoUrl (LOGO_URL)</strong> - Company logo URL (SVG recommended)</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">What You'll Receive</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Auth0 Client ID</strong> (AUTH0_CLIENT_ID)</li>
                  <li><strong>Auth0 Client Secret</strong> (AUTH0_CLIENT_SECRET)</li>
                  <li><strong>Auth0 Issuer Base URL</strong> (AUTH0_ISSUER_BASE_URL)</li>
                  <li><strong>RIVaaS Service URL</strong> (RIVAAS_SERVICE_URL)</li>
                  <li><strong>RIVaaS App URL</strong> (RIVAAS_APP_URL)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Integration Flow Concept
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The RIVaaS ID verification process follows these steps:
            </p>
            
            <div className="grid gap-3">
              {[
                "User starts remote identity verification on integration website",
                "Website requests session token from integration backend",
                "Integration backend requests JWT from Auth0 using client credentials",
                "Auth0 returns JWT to integration backend",
                "Integration backend requests session token from RIVaaS API using JWT",
                "Integration backend returns session token to integration website",
                "Integration website redirects user to RIVaaS App or loads RIVaaS iframe",
                "User verifies identity in RIVaaS App",
                "RIVaaS API provides customer data to integration backend via webhook",
                "RIVaaS App returns verification result via redirect or iframe message"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Options */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Redirect Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                User is redirected to a standalone RIVaaS web application for identity verification.
              </p>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Advantages:</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Full screen experience</li>
                  <li>• Complete control over UI/UX</li>
                  <li>• Better mobile compatibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Iframe Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                RIVaaS is embedded as an iframe within your existing web application.
              </p>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Advantages:</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Seamless user experience</li>
                  <li>• No page redirects</li>
                  <li>• Maintains application context</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Implementation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Backend Application Required:</strong> A backend application is mandatory because Auth0 
                client secret must be kept secure. Frontend applications are public and storing secrets in them 
                would compromise security.
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Backend Application</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Authenticate with Auth0</li>
                  <li>• Request session tokens</li>
                  <li>• Handle webhook callbacks</li>
                  <li>• Secure credential storage</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Frontend Application</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Initialize verification flow</li>
                  <li>• Handle redirects or iframes</li>
                  <li>• Process verification results</li>
                  <li>• User interface components</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Error Handling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Proper error handling is crucial for a good user experience. Handle these scenarios:
            </p>
            
            <div className="grid gap-3">
              {[
                { error: "Authentication Failure", description: "Invalid Auth0 credentials or expired tokens" },
                { error: "Network Issues", description: "Connection problems or service unavailability" },
                { error: "Verification Timeout", description: "User takes too long to complete verification" },
                { error: "Invalid Session", description: "Session token expired or invalid" },
                { error: "Webhook Delivery", description: "Callback URL unreachable or returns errors" }
              ].map((item, index) => (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm">{item.error}</h5>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}