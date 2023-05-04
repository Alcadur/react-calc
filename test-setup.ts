import { vi } from 'vitest';

vi.stubGlobal('crypto', {
    randomUUID() {
        return Math.random();
    }
});