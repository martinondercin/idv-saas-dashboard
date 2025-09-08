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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-4">
                <Badge variant="secondary" className="text-sm px-3 py-1 text-muted-foreground uppercase tracking-wider">
                  IDENTITY VERIFICATION SERVICE
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                Trusted identity verification you can start using <span className="text-secondary">today</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary-foreground/80 max-w-2xl">
                Our effective, ready-made identity verification service is tuned for a seamless user experience, 
                powered by best-performing biometrics and AI. It is designed for rapid deployment and reliable 
                performance at any volume, with no-commitment pricing.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                  <Link to="/login">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8">
                  Try demo
                </Button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <img 
                  src="/lovable-uploads/c8c89abb-42ae-4078-9e7f-89ec06aa59c6.png" 
                  alt="Identity verification dashboard interface"
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Floating UI Elements */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Rapid deployment
                  </div>
                </div>
                
                <div className="absolute top-32 right-0 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Omnichannel
                  </div>
                </div>
                
                <div className="absolute top-56 -right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Seamless UX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <Card className="bg-primary/5 border-primary/10 hover-lift transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">EFFORTLESS</span>
                </div>
                <CardTitle className="text-xl">Out-of-the-box SaaS</CardTitle>
                <CardDescription className="text-base">
                  Our identity verification can be launched in minutes with low-code integration. The universal verification process keeps setup light and UX clean.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                  Learn more →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary/5 border-secondary/10 hover-lift transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm font-medium text-secondary uppercase tracking-wider">SCALABLE</span>
                </div>
                <CardTitle className="text-xl">Elastic by design</CardTitle>
                <CardDescription className="text-base">
                  Whether you verify hundreds or millions, performance and uptime remain steady on our fully-managed, cloud-hosted infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                  Learn more →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/10 hover-lift transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium text-accent uppercase tracking-wider">FLEXIBLE</span>
                </div>
                <CardTitle className="text-xl">Pay-as-you-go</CardTitle>
                <CardDescription className="text-base">
                  Transparent, commitment-free pricing with zero implementation or hosting fees. You only pay for all finished checks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                  Learn more →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-muted hover-lift transition-smooth">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-sm font-medium text-foreground uppercase tracking-wider">USER-FRIENDLY</span>
                </div>
                <CardTitle className="text-xl">Omnichannel experience</CardTitle>
                <CardDescription className="text-base">
                  Our identity verification process is designed for the best user experience. A low-friction, smooth cross‑device flow lifts completion rates and satisfaction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                  Learn more →
                </Button>
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
              <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/login">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <span>Try Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
