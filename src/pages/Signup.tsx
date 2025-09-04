import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, UserPlus, Building } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - store user in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      email: formData.email, 
      name: `${formData.firstName} ${formData.lastName}`,
      company: formData.company
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
                <UserPlus className="w-4 h-4 text-primary" />
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
              Join Our Platform
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Start your journey with secure identity verification solutions
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground">Get started with your free account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="firstName" 
                  className="text-sm text-muted-foreground sr-only"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label 
                  htmlFor="lastName" 
                  className="text-sm text-muted-foreground sr-only"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor="company" 
                className="text-sm text-muted-foreground sr-only"
              >
                Company
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  className="h-12 pl-10 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
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
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor="confirmPassword" 
                className="text-sm text-muted-foreground sr-only"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className="h-12 bg-surface-elevated border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                required
                className="mt-1"
              />
              <Label 
                htmlFor="terms" 
                className="text-sm text-muted-foreground cursor-pointer leading-5"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-accent hover:text-accent/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-accent hover:text-accent/80">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}