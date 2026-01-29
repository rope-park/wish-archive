/**
 * Z-Index 유틸리티 테스트
 */

import { describe, it, expect } from 'vitest';
import { Z_INDEX } from '@/lib/z-index';

describe('Z_INDEX', () => {
  it('should have correct layering order', () => {
    // 기본 레이어 순서 확인
    expect(Z_INDEX.DESKTOP_ICON).toBeLessThan(Z_INDEX.WIDGET);
    expect(Z_INDEX.WIDGET).toBeLessThan(Z_INDEX.WINDOW_BASE);
    expect(Z_INDEX.WINDOW_BASE).toBeLessThan(Z_INDEX.TASKBAR);
    expect(Z_INDEX.TASKBAR).toBeLessThan(Z_INDEX.START_MENU);
  });

  it('should have viewport warning on top', () => {
    // 뷰포트 경고가 최상위여야 함
    expect(Z_INDEX.VIEWPORT_WARNING).toBeGreaterThan(Z_INDEX.START_MENU);
  });

  it('should have correct window stacking', () => {
    // 창 레이어링 확인
    expect(Z_INDEX.WINDOW_MAX).toBeGreaterThan(Z_INDEX.WINDOW_BASE);
    expect(Z_INDEX.WINDOW_MAX - Z_INDEX.WINDOW_BASE).toBe(1000);
  });
});
