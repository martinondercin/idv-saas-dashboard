import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Link2,
  QrCode,
  Trash2,
  Copy,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NoCodeVerification() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("api");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isUrlGenerated, setIsUrlGenerated] = useState(false);
  const [usageCount, setUsageCount] = useState(75);
  const [usageLimit, setUsageLimit] = useState(150);
  
  const usagePercentage = (usageCount / usageLimit) * 100;
  const isLimitReached = usageCount >= usageLimit;
  const isNearLimit = usagePercentage >= 80;

  const generateShortUrl = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const newUrl = `https://verify.verifyid.com/${randomId}`;
    setCurrentUrl(newUrl);
    setIsUrlGenerated(true);
    toast({
      title: "Link Generated",
      description: "Your verification link has been created successfully.",
    });
  };

  const generateQrCode = () => {
    if (!currentUrl) {
      toast({
        title: "No URL Available",
        description: "Please generate a link first before creating a QR code.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "QR Code Generated",
      description: "Your QR code is ready for download.",
    });
  };

  const revokeUrl = () => {
    setCurrentUrl("");
    setIsUrlGenerated(false);
    toast({
      title: "Link Revoked",
      description: "Your verification link has been disabled.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Integration & Configuration
          </h1>
          <p className="text-muted-foreground">
            Configure your verification channels and manage integration settings
          </p>
        </div>

        {/* Integration Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Integration Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api">API Integration</TabsTrigger>
                <TabsTrigger value="no-code">No-Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    API integration settings and documentation would be here.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="no-code" className="mt-6 space-y-6">
                {/* Usage Limit Meter */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Free Trial Usage</span>
                      {isLimitReached && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Limit Reached
                        </Badge>
                      )}
                      {isNearLimit && !isLimitReached && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Nearing Limit
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Verifications Used</span>
                        <span className="font-medium">
                          {usageCount}/{usageLimit} verifications
                        </span>
                      </div>
                      <Progress 
                        value={usagePercentage} 
                        className={`h-3 ${isNearLimit ? 'bg-destructive/20' : ''}`}
                      />
                      {isNearLimit && (
                        <p className="text-sm text-muted-foreground">
                          You're approaching your free trial limit. Contact us to upgrade your plan.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* No-Code Generator */}
                <Card>
                  <CardHeader>
                    <CardTitle>No-Code Verification Generator</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Generate a link and QR code for end users to start the verification process without API integration.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Generator Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        onClick={generateShortUrl}
                        disabled={isLimitReached}
                        className="flex items-center gap-2"
                      >
                        <Link2 className="h-4 w-4" />
                        Generate Link
                      </Button>
                      
                      <Button
                        onClick={generateQrCode}
                        disabled={isLimitReached || !currentUrl}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <QrCode className="h-4 w-4" />
                        Generate QR Code
                      </Button>
                      
                      <Button
                        onClick={revokeUrl}
                        disabled={!isUrlGenerated}
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Revoke Link
                      </Button>
                    </div>

                    {isLimitReached && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Free trial limit reached</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          You've used all available verifications. Upgrade your plan to continue.
                        </p>
                      </div>
                    )}

                    {/* Current Link & QR Code Display */}
                    {isUrlGenerated && (
                      <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-primary">
                            <Eye className="h-4 w-4" />
                            View Current Link & QR Code
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Current URL */}
                          <div className="space-y-2">
                            <Label htmlFor="current-url">Current Verification URL</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="current-url"
                                value={currentUrl}
                                readOnly
                                className="font-mono text-sm"
                              />
                              <Button
                                onClick={copyToClipboard}
                                size="sm"
                                variant="outline"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* QR Code Placeholder */}
                          <div className="space-y-2">
                            <Label>QR Code</Label>
                            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
                              <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                                <QrCode className="h-16 w-16 text-muted-foreground" />
                              </div>
                              <p className="text-sm text-muted-foreground mt-4">
                                QR Code for: {currentUrl}
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-2 flex items-center gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download QR Code
                              </Button>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span>Link is active and ready for use</span>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Instructions */}
                    <Card className="bg-muted/50">
                      <CardContent className="pt-6">
                        <h4 className="font-medium mb-2">How it works:</h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Click "Generate Link" to create a unique verification URL</li>
                          <li>Optionally generate a QR code for easy mobile access</li>
                          <li>Share the link or QR code with your end users</li>
                          <li>Users click the link or scan the QR code to start verification</li>
                          <li>Monitor usage in your dashboard and revoke when needed</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}