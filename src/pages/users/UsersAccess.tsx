import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Users, Shield, Key, Activity, Plus, Edit, Trash2, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const initialUsers = [
  {
    id: "usr_001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-22 09:15:32",
    department: "Product Settings",
    permissions: ["view_transactions", "approve_cases", "manage_rules"]
  },
  {
    id: "usr_002", 
    name: "Sarah Smith",
    email: "sarah.smith@company.com",
    role: "Admin",
    status: "Active", 
    lastLogin: "2024-01-22 08:45:12",
    department: "Operations",
    permissions: ["view_transactions", "approve_cases", "manage_rules", "manage_users"]
  },
  {
    id: "usr_003",
    name: "Mike Johnson", 
    email: "mike.johnson@company.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2024-01-20 16:30:45",
    department: "Analytics",
    permissions: ["view_transactions", "review_cases"]
  },
  {
    id: "usr_004",
    name: "Emily Davis",
    email: "emily.davis@company.com", 
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-22 07:20:18", 
    department: "IT Security",
    permissions: ["full_access"]
  }
];

const userFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  role: z.enum(["Admin", "Manager", "Viewer"], { message: "Please select a valid role" }),
  department: z.string().trim().min(2, { message: "Department is required" }).max(100),
  notes: z.string().max(500).optional()
});

const roles = [
  {
    name: "Admin",
    description: "Full system access, user management, and creates new Manager accounts for product settings team",
    userCount: 3,
    permissions: ["Full Access", "User Management", "System Configuration", "Role Management", "Audit Trail Review"],
    color: "destructive"
  },
  {
    name: "Manager", 
    description: "Configures product verification settings without accessing user management",
    userCount: 8,
    permissions: ["Product Settings", "Verification Rules", "Advanced Reports", "Workflow Configuration"],
    color: "default"
  },
  {
    name: "Viewer",
    description: "Analyzes dashboard reports and exports data for presentations",
    userCount: 17,
    permissions: ["View Reports", "Export Data", "Dashboard Access", "Basic Analytics"],
    color: "outline"
  }
];

const auditLogs = [
  {
    id: "log_001",
    user: "John Doe",
    action: "Approved high-risk case",
    resource: "case_12345", 
    timestamp: "2024-01-22 14:30:15",
    ipAddress: "192.168.1.100",
    result: "Success"
  },
  {
    id: "log_002",
    user: "Sarah Smith", 
    action: "Updated risk rule threshold",
    resource: "rule_face_match",
    timestamp: "2024-01-22 13:45:22",
    ipAddress: "192.168.1.102",
    result: "Success"
  },
  {
    id: "log_003",
    user: "Emily Davis",
    action: "Created new user account", 
    resource: "usr_005",
    timestamp: "2024-01-22 11:20:08",
    ipAddress: "192.168.1.105",
    result: "Success"
  },
  {
    id: "log_004",
    user: "Unknown",
    action: "Failed login attempt",
    resource: "login_system",
    timestamp: "2024-01-22 02:15:33", 
    ipAddress: "203.0.113.5",
    result: "Failed"
  }
];

const ssoProviders = [
  { name: "Azure Active Directory", status: "Connected", users: 45, lastSync: "2024-01-22 06:00:00" },
  { name: "Google Workspace", status: "Connected", users: 23, lastSync: "2024-01-22 06:00:00" },
  { name: "Okta", status: "Disconnected", users: 0, lastSync: "Never" }
];

const getStatusBadge = (status: string) => {
  return status === "Active" ? 
    <Badge variant="default">Active</Badge> : 
    <Badge variant="secondary">Inactive</Badge>;
};

const getRoleBadge = (role: string, color: string) => {
  return <Badge variant={color as any}>{role}</Badge>;
};

export default function UsersAccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Viewer",
      department: "",
      notes: ""
    }
  });

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: values.name,
      email: values.email,
      role: values.role,
      status: "Active" as const,
      lastLogin: "Never",
      department: values.department,
      permissions: roles.find(r => r.name === values.role)?.permissions || []
    };

    setUsers(prev => [...prev, newUser]);
    setIsAddUserOpen(false);
    form.reset();
    
    toast({
      title: "User invitation sent",
      description: `${values.name} has been invited as ${values.role} with appropriate access level.`
    });
  };
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/users/roles") return "roles";
    if (path === "/users/sso") return "sso";
    if (path === "/users/audit") return "audit";
    return "users"; // default to users tab
  };

  const handleTabChange = (value: string) => {
    // Navigate to the appropriate route when tab changes
    switch (value) {
      case "users":
        navigate("/users");
        break;
      case "roles":
        navigate("/users/roles");
        break;
      case "sso":
        navigate("/users/sso");
        break;
      case "audit":
        navigate("/users/audit");
        break;
    }
  };

  const activeTab = getActiveTab();
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users & Access Management</h1>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Invite a new user and assign role</p>
                </TooltipContent>
              </Tooltip>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="user@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Admin">Admin - Full system access</SelectItem>
                            <SelectItem value="Manager">Manager - Product settings only</SelectItem>
                            <SelectItem value="Viewer">Viewer - Reports and analytics</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Product Settings, Analytics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about this user..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Send Invitation
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+3 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">89% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSO Connected</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">Users with SSO access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="sso">SSO & MFA</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Directory</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Search users..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit user profile</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete user account</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-6">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getRoleBadge(role.name, role.color)}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({role.userCount} users)
                        </span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Role
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Modify role permissions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sso">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Single Sign-On Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ssoProviders.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{provider.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{provider.users} users</span>
                        <span>•</span>
                        <span>Last sync: {provider.lastSync}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={provider.status === "Connected" ? "default" : "secondary"}>
                        {provider.status}
                      </Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            {provider.status === "Connected" ? "Configure" : "Connect"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{provider.status === "Connected" ? "Configure SSO settings" : "Connect SSO provider"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multi-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require MFA for all users</p>
                    <p className="text-sm text-muted-foreground">Force all users to enable 2FA</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">MFA for high-risk actions</p>
                    <p className="text-sm text-muted-foreground">Require MFA for sensitive operations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Remember trusted devices</p>
                    <p className="text-sm text-muted-foreground">Allow users to trust devices for 30 days</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Security Audit Log</CardTitle>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="login">Login Events</SelectItem>
                      <SelectItem value="case">Case Actions</SelectItem>
                      <SelectItem value="user">User Management</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        Export Log
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export audit log to file</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={log.result === "Success" ? "default" : "destructive"}>
                          {log.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </TooltipProvider>
  );
}