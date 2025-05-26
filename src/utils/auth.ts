import { supabase } from '../lib/supabase';

// 简单的登录验证
export async function loginUser(username: string, password: string) {
  try {
    // 在实际应用中，应该使用更安全的身份验证方法
    // 这里使用简化的方法，仅用于演示
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { success: true, user: data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Invalid credentials' };
  }
}

// 检查用户是否已登录
export function isLoggedIn() {
  // 在客户端检查会话存储
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return !!user;
  }
  return false;
}

// 保存用户会话
export function saveUserSession(user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

// 清除用户会话
export function clearUserSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

// 获取当前用户
export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        clearUserSession();
      }
    }
  }
  return null;
}

// 初始化默认管理员用户
export async function initializeDefaultAdmin() {
  try {
    // 检查是否已有用户
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('count')
      .single();
    
    if (checkError) {
      // 表可能不存在，尝试创建
      await supabase.rpc('create_users_table_if_not_exists');
    }
    
    // 如果没有用户，创建默认管理员
    if (!existingUsers || existingUsers.count === 0) {
      const { error } = await supabase
        .from('users')
        .insert([
          {
            username: 'admin',
            password: 'admin123', // 在实际应用中应使用加密密码
            isAdmin: true
          }
        ]);
      
      if (error) throw error;
      console.log('Default admin user created');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error initializing admin:', error);
    return { success: false, error };
  }
}
