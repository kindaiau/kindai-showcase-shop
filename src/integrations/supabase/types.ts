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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          operation: string
          record_id: string | null
          sensitive_data_accessed: Json | null
          table_name: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          operation: string
          record_id?: string | null
          sensitive_data_accessed?: Json | null
          table_name: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          operation?: string
          record_id?: string | null
          sensitive_data_accessed?: Json | null
          table_name?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
          phone: string
          status: string
          submitted_at: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
          phone: string
          status?: string
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
          phone?: string
          status?: string
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          phone: string | null
          preferences: Json | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          subscribed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      toolkit_content: {
        Row: {
          category: string
          content: Json
          content_type: Database["public"]["Enums"]["toolkit_content_type"]
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_premium: boolean | null
          order_index: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: Json
          content_type: Database["public"]["Enums"]["toolkit_content_type"]
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_premium?: boolean | null
          order_index?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: Json
          content_type?: Database["public"]["Enums"]["toolkit_content_type"]
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_premium?: boolean | null
          order_index?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_generated_content: {
        Row: {
          content: string
          content_type: string
          created_at: string
          id: string
          metadata: Json | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_purchases: {
        Row: {
          created_at: string
          email: string
          gumroad_sale_id: string | null
          id: string
          is_verified: boolean
          license_key: string | null
          product_id: string
          purchase_date: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          gumroad_sale_id?: string | null
          id?: string
          is_verified?: boolean
          license_key?: string | null
          product_id: string
          purchase_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          gumroad_sale_id?: string | null
          id?: string
          is_verified?: boolean
          license_key?: string | null
          product_id?: string
          purchase_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_toolkit_progress: {
        Row: {
          completed_at: string | null
          completed_steps: Json | null
          content_id: string
          id: string
          is_completed: boolean | null
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_steps?: Json | null
          content_id: string
          id?: string
          is_completed?: boolean | null
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_steps?: Json | null
          content_id?: string
          id?: string
          is_completed?: boolean | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_toolkit_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "toolkit_content"
            referencedColumns: ["id"]
          },
        ]
      }
      water_quotes: {
        Row: {
          additional_notes: string | null
          admin_notes: string | null
          calculated_price: number
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_address: string
          id: string
          preferred_date: string
          price_breakdown: Json | null
          quantity_kl: number
          status: string
          updated_at: string
          water_type: string
        }
        Insert: {
          additional_notes?: string | null
          admin_notes?: string | null
          calculated_price: number
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_address: string
          id?: string
          preferred_date: string
          price_breakdown?: Json | null
          quantity_kl: number
          status?: string
          updated_at?: string
          water_type: string
        }
        Update: {
          additional_notes?: string | null
          admin_notes?: string | null
          calculated_price?: number
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_address?: string
          id?: string
          preferred_date?: string
          price_breakdown?: Json | null
          quantity_kl?: number
          status?: string
          updated_at?: string
          water_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      detect_suspicious_access: {
        Args: never
        Returns: {
          access_count: number
          first_access: string
          last_access: string
          unique_records_accessed: number
          user_id: string
        }[]
      }
      encrypt_customer_data: { Args: { data: string }; Returns: string }
      ensure_admin_exists: { Args: never; Returns: boolean }
      get_current_user_role: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_current_user_admin: { Args: never; Returns: boolean }
      verify_admin_with_audit: {
        Args: {
          operation: string
          record_id?: string
          sensitive_fields?: Json
          table_name: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      toolkit_content_type: "guide" | "template" | "checklist"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      toolkit_content_type: ["guide", "template", "checklist"],
    },
  },
} as const
