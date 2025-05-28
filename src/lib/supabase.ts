import md5 from 'md5';

// 默认管理员账户信息
const DEFAULT_ADMIN = {
  email: 'admin@ctrlv.ai',
  password: 'admin123', // 明文密码，会被MD5加密后存储
  username: 'admin',
  role: 'admin',
};

// 本地存储键名
const ADMIN_STORAGE_KEY = 'ctrlv_admin_account';

// 初始化默认管理员账户
export function initializeDefaultAdmin() {
  try {
    // 检查本地存储中是否已有管理员账户
    const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    
    if (!storedAdmin) {
      // 如果没有，创建默认管理员账户并存储
      const adminAccount = {
        email: DEFAULT_ADMIN.email,
        passwordHash: md5(DEFAULT_ADMIN.password),
        username: DEFAULT_ADMIN.username,
        role: DEFAULT_ADMIN.role,
        created_at: new Date().toISOString(),
      };
      
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminAccount));
      console.log('默认管理员账户创建成功');
    } else {
      console.log('管理员账户已存在');
    }
  } catch (error) {
    console.log('初始化管理员账户时出错:', error);
  }
}

// 验证管理员登录
export function verifyAdminLogin(email: string, password: string): boolean {
  try {
    const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!storedAdmin) return false;
    
    const adminAccount = JSON.parse(storedAdmin);
    return (
      adminAccount.email === email && 
      adminAccount.passwordHash === md5(password)
    );
  } catch (error) {
    console.log('验证管理员登录时出错:', error);
    return false;
  }
}

// 获取当前管理员信息（不包含密码哈希）
export function getAdminInfo() {
  try {
    const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!storedAdmin) return null;
    
    const adminAccount = JSON.parse(storedAdmin);
    // 返回不包含密码哈希的信息
    const { passwordHash, ...adminInfo } = adminAccount;
    return adminInfo;
  } catch (error) {
    console.log('获取管理员信息时出错:', error);
    return null;
  }
}