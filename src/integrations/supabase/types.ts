export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          duration: number | null
          id: string
          name: string
          notes: string | null
          order_index: number
          reps: number
          sets: number
          weight: number | null
          workout_id: string
        }
        Insert: {
          duration?: number | null
          id?: string
          name: string
          notes?: string | null
          order_index: number
          reps: number
          sets: number
          weight?: number | null
          workout_id: string
        }
        Update: {
          duration?: number | null
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          reps?: number
          sets?: number
          weight?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category: string
          createdat: number
          description: string
          id: string
          imageurl: string | null
          language: string
          previewcode: string
          price: number
          selleraddress: string
          tags: string[] | null
          title: string
        }
        Insert: {
          category: string
          createdat: number
          description: string
          id: string
          imageurl?: string | null
          language: string
          previewcode: string
          price: number
          selleraddress: string
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string
          createdat?: number
          description?: string
          id?: string
          imageurl?: string | null
          language?: string
          previewcode?: string
          price?: number
          selleraddress?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          fitness_level: string | null
          full_name: string | null
          goals: string[] | null
          height: number | null
          id: string
          updated_at: string
          username: string | null
          weight: number | null
        }
        Insert: {
          created_at?: string
          fitness_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          height?: number | null
          id: string
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Update: {
          created_at?: string
          fitness_level?: string | null
          full_name?: string | null
          goals?: string[] | null
          height?: number | null
          id?: string
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          buyeraddress: string
          id: string
          listingid: string
          selleraddress: string
          status: string
          timestamp: number
          txhash: string
        }
        Insert: {
          amount: number
          buyeraddress: string
          id: string
          listingid: string
          selleraddress: string
          status: string
          timestamp: number
          txhash: string
        }
        Update: {
          amount?: number
          buyeraddress?: string
          id?: string
          listingid?: string
          selleraddress?: string
          status?: string
          timestamp?: number
          txhash?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_listingid_fkey"
            columns: ["listingid"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          ai_generated: boolean
          calories_burned: number | null
          completed: boolean
          created_at: string
          date: string
          description: string | null
          duration: number
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          ai_generated?: boolean
          calories_burned?: number | null
          completed?: boolean
          created_at?: string
          date?: string
          description?: string | null
          duration: number
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          ai_generated?: boolean
          calories_burned?: number | null
          completed?: boolean
          created_at?: string
          date?: string
          description?: string | null
          duration?: number
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
