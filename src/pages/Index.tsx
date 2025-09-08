import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BarChart3, Settings, CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-primary/90" />
        
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-secondary/20 rounded-full" />
          <div className="absolute top-40 right-32 w-4 h-4 bg-accent rounded-full" />
          <div className="absolute bottom-32 left-32 w-2 h-24 bg-secondary/30 transform rotate-45" />
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-secondary/30 transform rotate-12" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                IDENTITY VERIFICATION SERVICE
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
              Trusted identity verification you can start using 
              <span className="block text-secondary">today</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Our effective, ready-made identity verification service is tuned for a seamless user experience, 
              powered by best-performing biometrics and AI. It is designed for rapid deployment and reliable 
              performance at any volume, with no-commitment pricing.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                <Link to="/login">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage identity verification
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive tools and insights to streamline your verification workflows
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Card className="hover-lift transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Integration & Configuration</CardTitle>
                <CardDescription>
                  Manage API keys, webhooks, and endpoint configurations for seamless integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">API Key Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Webhook Configuration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Environment Settings</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-secondary-vibrant" />
                </div>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Track verification activity and monitor system performance in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-pending" />
                    <span className="text-sm text-muted-foreground">Live Transaction Feed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Alert Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Performance Metrics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Case Management</CardTitle>
                <CardDescription>
                  Handle manual reviews and manage verification cases efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Manual Review Queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Escalation Rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Audit Trails</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-surface-elevated py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Trusted by verification leaders
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Industry-leading performance and reliability
              </p>
            </div>
            <div className="mx-auto mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card p-8 text-center">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="bg-card p-8 text-center">
                <div className="text-3xl font-bold text-accent">2.5s</div>
                <div className="text-sm text-muted-foreground">Avg Processing</div>
              </div>
              <div className="bg-card p-8 text-center">
                <div className="text-3xl font-bold text-secondary-vibrant">10M+</div>
                <div className="text-sm text-muted-foreground">Verifications</div>
              </div>
              <div className="bg-card p-8 text-center">
                <div className="text-3xl font-bold text-accent">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary relative isolate overflow-hidden">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
              Join thousands of businesses using our identity verification platform
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/signup">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
