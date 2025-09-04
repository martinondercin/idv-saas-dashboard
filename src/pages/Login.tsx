import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Eye } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - store user in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      email, 
      name: email.split('@')[0] 
    }));
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        {/* Geometric Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-secondary/30 rounded-full" />
          <div className="absolute top-40 right-32 w-4 h-4 bg-accent rounded-full" />
          <div className="absolute bottom-32 left-32 w-2 h-24 bg-secondary/40 transform rotate-45" />
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-secondary/50 transform rotate-12" />
          
          {/* Tech Pattern */}
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
            <div className="relative">
              <Shield className="w-24 h-24 text-secondary/80" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Dotted lines */}
          <div className="absolute top-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-accent/60 to-transparent transform rotate-45" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Secure Identity Verification
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Protect your business with our advanced verification services
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Log in</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm text-muted-foreground sr-only"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-sm text-muted-foreground sr-only"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}