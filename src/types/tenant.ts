export type TenantStatus = 'active' | 'suspended' | 'trial' | 'inactive';
export type TenantRegion = 'eu-central-1' | 'us-east-1' | 'us-west-2' | 'ap-southeast-1';

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  status: TenantStatus;
  region: TenantRegion;
  dataResidency: string;
  contactEmail: string;
  createdAt: string;
  plan: string;
  verifications24h: number;
  verifications30d: number;
  successRate: number;
  activeUsers: number;
  apiKeys: number;
  webhooks: string[];
  features: {
    ocrEnabled: boolean;
    faceMatchEnabled: boolean;
    livenessEnabled: boolean;
    amlEnabled: boolean;
  };
  quotas: {
    monthlyVerifications: number;
    used: number;
  };
  riskFlags?: string[];
}

export interface TenantSummary {
  id: string;
  name: string;
  status: TenantStatus;
  region: TenantRegion;
  verifications24h: number;
  successRate: number;
  plan: string;
  riskFlags?: string[];
}
