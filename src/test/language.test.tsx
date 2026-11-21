import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider, useLanguage } from '@/lib/language';
import { searchContent } from '@/lib/portal-data';

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); localStorage.clear(); });

describe('Shared language selection', () => {
  it('switches between Bengali and English for all consumers', () => {
    const { result } = renderHook(() => [useLanguage(), useLanguage()], { wrapper: LanguageProvider });
    act(() => result.current[0]?.setLanguage('bn'));
    expect(result.current.map(context => context.language)).toEqual(['bn', 'bn']);
    expect(document.documentElement.lang).toBe('bn');
    act(() => result.current[1]?.setLanguage('en'));
    expect(result.current.map(context => context.language)).toEqual(['en', 'en']);
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores the selected language when the website is reopened', async () => {
    const first = renderHook(useLanguage, { wrapper: LanguageProvider });
    act(() => first.result.current.setLanguage('bn'));
    first.unmount();
    const reopened = renderHook(useLanguage, { wrapper: LanguageProvider });
    await waitFor(() => expect(reopened.result.current.language).toBe('bn'));
    expect(JSON.parse(localStorage.getItem('sholok-language') ?? 'null')).toBe('bn');
  });
});

describe('Bilingual header search', () => {
  it('finds services using Bengali and English keywords', () => {
    expect(searchContent('কেনাকাটা').some(result => result.slug === 'shopping' && result.type === 'Service')).toBe(true);
    expect(searchContent('Shopping').some(result => result.slug === 'shopping' && result.type === 'Service')).toBe(true);
  });
  it('finds Bengali product keywords', () => {
    expect(searchContent('হেডফোন').some(result => result.title === 'Studio Wireless Headphones' && result.type === 'Product')).toBe(true);
  });
  it('finds Bengali article keywords and opens the corresponding content section', () => {
    expect(searchContent('সবুজ দিগন্ত').some(result => result.title === 'A greener skyline: Dhaka’s next chapter' && result.slug === 'blog')).toBe(true);
  });
});