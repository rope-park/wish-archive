/**
 * Vitest 테스트 환경 설정
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 후 자동 cleanup
afterEach(() => {
  cleanup();
});
