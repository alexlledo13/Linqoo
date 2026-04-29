export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          plan: "free" | "premium";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          plan?: "free" | "premium";
          created_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          plan?: "free" | "premium";
        };
        Relationships: [];
      };
      links: {
        Row: {
          id: string;
          user_id: string;
          slug: string;
          target_url: string;
          active: boolean;
          ad_enabled: boolean;
          click_count: number;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug: string;
          target_url: string;
          active?: boolean;
          ad_enabled?: boolean;
          click_count?: number;
          created_at?: string;
          expires_at?: string | null;
        };
        Update: {
          slug?: string;
          target_url?: string;
          active?: boolean;
          ad_enabled?: boolean;
          click_count?: number;
          expires_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      clicks: {
        Row: {
          id: string;
          link_id: string;
          created_at: string;
          referrer: string | null;
          country: string | null;
          device: string | null;
          ip_hash: string | null;
        };
        Insert: {
          id?: string;
          link_id: string;
          created_at?: string;
          referrer?: string | null;
          country?: string | null;
          device?: string | null;
          ip_hash?: string | null;
        };
        Update: {
          referrer?: string | null;
          country?: string | null;
          device?: string | null;
          ip_hash?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clicks_link_id_fkey";
            columns: ["link_id"];
            isOneToOne: false;
            referencedRelation: "links";
            referencedColumns: ["id"];
          }
        ];
      };
      usage_monthly: {
        Row: {
          id: string;
          user_id: string;
          month: string;
          links_created: number;
          clicks_served: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          month: string;
          links_created?: number;
          clicks_served?: number;
          created_at?: string;
        };
        Update: {
          links_created?: number;
          clicks_served?: number;
        };
        Relationships: [
          {
            foreignKeyName: "usage_monthly_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_link_metrics: {
        Args: {
          input_link_id: string;
        };
        Returns: void;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
