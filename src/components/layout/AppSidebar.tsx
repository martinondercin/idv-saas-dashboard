import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Settings,
  Activity,
  FileCheck,
  Workflow,
  BarChart3,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Integration & Configuration",
    url: "/integration",
    icon: Settings,
    items: [
      { title: "API Keys & Webhooks", url: "/integration/api-keys" },
      { title: "Endpoint Configuration", url: "/integration/endpoints" },
      { title: "Environment Settings", url: "/integration/environments" },
    ],
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Activity,
    items: [
      { title: "Overview", url: "/transactions" },
      { title: "Real-time Feed", url: "/transactions/feed" },
      { title: "Failed Transactions", url: "/transactions/failed" },
    ],
  },
  {
    title: "Case Management",
    url: "/cases",
    icon: FileCheck,
    items: [
      { title: "Manual Review Queue", url: "/cases/review" },
      { title: "Escalation Rules", url: "/cases/escalation" },
      { title: "Transaction Details", url: "/cases/details" },
    ],
  },
  {
    title: "Workflow Settings",
    url: "/workflows",
    icon: Workflow,
    items: [
      { title: "Risk Scoring", url: "/workflows/risk-scoring" },
      { title: "Rule Sets", url: "/workflows/rules" },
      { title: "Feature Toggles", url: "/workflows/features" },
    ],
  },
  {
    title: "Reporting",
    url: "/reports",
    icon: BarChart3,
    items: [
      { title: "KPI Dashboard", url: "/reports/kpi" },
      { title: "Custom Reports", url: "/reports/custom" },
      { title: "Export Center", url: "/reports/export" },
    ],
  },
  {
    title: "Users & Access",
    url: "/users",
    icon: Users,
    items: [
      { title: "Role Management", url: "/users/roles" },
      { title: "SSO & MFA", url: "/users/sso" },
      { title: "Audit Log", url: "/users/audit" },
    ],
  },
];

export function AppSidebar() {
  const { state, setOpen } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  const hasActiveChild = (items: { url: string }[]) => {
    return items.some(item => isActiveRoute(item.url));
  };

  // Auto-expand section if it contains the active route
  const getDefaultExpandedSections = () => {
    return navigationItems
      .filter(section => isActiveRoute(section.url) || hasActiveChild(section.items || []))
      .map(section => section.title);
  };

  return (
    <Sidebar className={cn("border-r border-sidebar-border bg-sidebar")}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                VerifyID
              </h2>
              <p className="text-xs text-sidebar-foreground/70">
                Identity Dashboard
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {!isCollapsed ? (
          <Accordion 
            type="multiple" 
            defaultValue={getDefaultExpandedSections()}
            className="w-full"
          >
            {navigationItems.map((section) => (
              <AccordionItem key={section.title} value={section.title} className="border-none">
                <AccordionTrigger className="py-2 px-3 hover:no-underline hover:bg-sidebar-accent/50 rounded-md [&[data-state=open]>div>svg]:rotate-180">
                  <div className="flex items-center gap-3 flex-1">
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        className={cn(
                          "w-full justify-start transition-colors ml-7",
                          isActiveRoute(section.url)
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                        )}
                      >
                        <NavLink to={section.url} className="flex items-center gap-3">
                          <span className="text-sm">Overview</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {section.items && (
                      <>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              size="sm"
                              className={cn(
                                "w-full justify-start transition-colors ml-7",
                                isActiveRoute(item.url)
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/30"
                              )}
                            >
                              <NavLink to={item.url} className="text-sm">
                                {item.title}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </>
                    )}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          // Collapsed sidebar - show only icons
          <div className="space-y-2">
            {navigationItems.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        className={cn(
                          "w-full justify-center transition-colors",
                          isActiveRoute(section.url) || hasActiveChild(section.items || [])
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <NavLink to={section.url} className="flex items-center justify-center">
                          <section.icon className="h-4 w-4" />
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(!isCollapsed)}
          className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}