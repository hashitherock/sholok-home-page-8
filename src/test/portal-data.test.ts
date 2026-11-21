import { describe, expect, it } from 'vitest';
import { services, searchContent, products, getProductPage } from '@/lib/portal-data';
describe('SHOLOK portal rules',()=>{
 it('shows four products in each unfiltered portal shopping page',()=>{
  expect(getProductPage(products,0).map(p=>p.id)).toEqual([1,2,3,4]);
  expect(getProductPage(products,1).map(p=>p.id)).toEqual([5,6,1,2]);
 });
 it('does not duplicate products when a filter returns fewer than four',()=>{
  expect(getProductPage(products.filter(p=>p.category==='Electronics'),0).map(p=>p.id)).toEqual([1,5]);
 });
 it('contains exactly the specified 17 core services',()=>{
  expect(services.map(s=>s.name)).toEqual(['Cafe','Blog','Shopping','News','Smart Store','Map','Knowledge','Webtoon','Series','TV / Videos','Music','Translator','Dictionary','Finance','Sports','Weather','Real Estate']);
 });
 it('keeps platform destinations out of the core services',()=>{
  expect(services.some(s=>['My Account','Search','Main Portal'].includes(s.name))).toBe(false);
 });
 it('uses the specified shopping and seller domains',()=>{
  expect(services.find(s=>s.slug==='shopping')?.url).toBe('https://shopping.sholok.com');
  expect(services.find(s=>s.slug==='smartstore')?.url).toBe('https://smartstore.sholok.com');
 });
 it('searches locally across services, products and articles',()=>{
  expect(searchContent('shopping').some(x=>x.type==='Service')).toBe(true);
  expect(searchContent('headphones').some(x=>x.type==='Product')).toBe(true);
  expect(searchContent('greener skyline').some(x=>x.type==='Article')).toBe(true);
  expect(searchContent('not-a-real-match-9812')).toEqual([]);
 });
});