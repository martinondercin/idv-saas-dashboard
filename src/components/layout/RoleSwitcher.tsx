import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RoleSwitcher() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('userRole') === 'innovatrics_admin';
  });

  const toggleRole = () => {
    const newRole = isAdmin ? 'tenant_user' : 'innovatrics_admin';
    localStorage.setItem('userRole', newRole);
    setIsAdmin(!isAdmin);
    
    // Navigate to appropriate page based on new role
    if (newRole === 'innovatrics_admin') {
      navigate('/admin/tenants');
    } else {
      navigate('/dashboard');
    }
    
    // Trigger a page reload to update sidebar
    window.location.reload();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleRole}
      className="gap-2"
      title={`Switch to ${isAdmin ? 'Tenant' : 'Admin'} view`}
    >
      {isAdmin ? (
        <>
          <Shield className="h-4 w-4" />
          Admin Mode
        </>
      ) : (
        <>
          <User className="h-4 w-4" />
          Tenant Mode
        </>
      )}
    </Button>
  );
}
