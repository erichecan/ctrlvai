import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// 增加测试查询的超时时间
configure({ testIdAttribute: 'data-testid', asyncUtilTimeout: 4500 });