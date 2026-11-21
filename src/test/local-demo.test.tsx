import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalDemo } from '@/hooks/use-local-demo';
describe('local demo preferences',()=>{
 beforeEach(()=>localStorage.clear());
 it('persists account updates even when the account dialog closes immediately',()=>{
  const account=renderHook(()=>useLocalDemo('sholok-user',''));
  act(()=>account.result.current[1]('Demo Explorer'));
  account.unmount();
  expect(localStorage.getItem('sholok-user')).toBe('"Demo Explorer"');
 });
 it('shares wishlist changes with other widgets and restores them after reopening',async()=>{
  const first=renderHook(()=>useLocalDemo<number[]>('sholok-saved',[]));
  const second=renderHook(()=>useLocalDemo<number[]>('sholok-saved',[]));
  act(()=>first.result.current[1]([1]));
  await waitFor(()=>expect(second.result.current[0]).toEqual([1]));
  first.unmount();second.unmount();
  const reopened=renderHook(()=>useLocalDemo<number[]>('sholok-saved',[]));
  await waitFor(()=>expect(reopened.result.current[0]).toEqual([1]));
 });
});