// Generated from Supabase project xssegdkfwvbyqbxctsdi.
// Regenerate after schema changes; do not edit manually.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      ai_providers: {
        Row: {
          display_name: string
          id: string
          is_active: boolean
        }
        Insert: {
          display_name: string
          id: string
          is_active?: boolean
        }
        Update: {
          display_name?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      ai_responses: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          latency_ms: number | null
          model_name: string | null
          prompt_id: string
          provider_id: string
          response_status: string
          response_text: string | null
          run_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          latency_ms?: number | null
          model_name?: string | null
          prompt_id: string
          provider_id: string
          response_status?: string
          response_text?: string | null
          run_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          latency_ms?: number | null
          model_name?: string | null
          prompt_id?: string
          provider_id?: string
          response_status?: string
          response_text?: string | null
          run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "test_prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_responses_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_responses_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "measurement_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_responses_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "v_share_of_voice"
            referencedColumns: ["run_id"]
          },
        ]
      }
      measurement_runs: {
        Row: {
          completed_at: string | null
          config: Json
          created_at: string
          id: string
          market_scope: string
          panel_mode: string
          started_at: string | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          config?: Json
          created_at?: string
          id?: string
          market_scope?: string
          panel_mode?: string
          started_at?: string | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          config?: Json
          created_at?: string
          id?: string
          market_scope?: string
          panel_mode?: string
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      response_brand_metrics: {
        Row: {
          brand_id: string
          citation_count: number
          created_at: string
          evidence: Json
          first_mention_position: number | null
          id: string
          mention_count: number
          recommendation_count: number
          response_id: string
          sentiment: string | null
        }
        Insert: {
          brand_id: string
          citation_count?: number
          created_at?: string
          evidence?: Json
          first_mention_position?: number | null
          id?: string
          mention_count?: number
          recommendation_count?: number
          response_id: string
          sentiment?: string | null
        }
        Update: {
          brand_id?: string
          citation_count?: number
          created_at?: string
          evidence?: Json
          first_mention_position?: number | null
          id?: string
          mention_count?: number
          recommendation_count?: number
          response_id?: string
          sentiment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "response_brand_metrics_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "tracked_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_brand_metrics_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "v_share_of_voice"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "response_brand_metrics_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "ai_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      response_citations: {
        Row: {
          brand_id: string | null
          citation_position: number | null
          created_at: string
          domain: string | null
          id: string
          response_id: string
          title: string | null
          url: string
        }
        Insert: {
          brand_id?: string | null
          citation_position?: number | null
          created_at?: string
          domain?: string | null
          id?: string
          response_id: string
          title?: string | null
          url: string
        }
        Update: {
          brand_id?: string | null
          citation_position?: number | null
          created_at?: string
          domain?: string | null
          id?: string
          response_id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "response_citations_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "tracked_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_citations_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "v_share_of_voice"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "response_citations_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "ai_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      test_prompts: {
        Row: {
          category: string
          code: string
          created_at: string
          id: string
          is_active: boolean
          language: string
          prompt_text: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          language: string
          prompt_text: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          prompt_text?: string
        }
        Relationships: []
      }
      tracked_brands: {
        Row: {
          created_at: string
          domain: string
          id: string
          is_active: boolean
          is_own_brand: boolean
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          is_active?: boolean
          is_own_brand?: boolean
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          is_active?: boolean
          is_own_brand?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_share_of_voice: {
        Row: {
          brand_id: string | null
          brand_name: string | null
          citations: number | null
          language: string | null
          measured_at: string | null
          mentions: number | null
          provider_id: string | null
          recommendations: number | null
          run_id: string | null
          share_of_voice_pct: number | null
          successful_responses: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
