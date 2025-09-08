import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1e3a5f] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/10 rounded-full" />
        <div className="absolute bottom-32 left-32 w-2 h-24 bg-white/10 transform rotate-45" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-white/10 transform rotate-12" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 sm:py-48 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2 uppercase tracking-wider">
              IDENTITY VERIFICATION SERVICE
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
            Trusted identity verification you can start using{" "}
            <span className="text-blue-300">today</span>
          </h1>
          
          <p className="mt-8 text-lg leading-8 text-white/80 max-w-3xl mx-auto">
            Our effective, ready-made identity verification service is tuned for a seamless user experience, 
            powered by best-performing biometrics and AI. It is designed for rapid deployment and reliable 
            performance at any volume, with no-commitment pricing.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base font-medium rounded-md"
            >
              <Link to="/login">Get Started</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-base font-medium rounded-md bg-transparent"
            >
              Try demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
