import { createClient } from "@/lib/supabase/server";
export type UserType = 'guest' | 'regular';

export const auth = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const user = data?.claims
  return {
    expires: user?.exp,
    user: {
      type: 'regular' as UserType,
      id: user?.sub || '',
      ...user,
    }
  }
}
