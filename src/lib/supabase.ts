import { createClient } from '@supabase/supabase-js';

// 创建一个简单的Supabase客户端
// 在实际部署时，这些值应该从环境变量中获取
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
