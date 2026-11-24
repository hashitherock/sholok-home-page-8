import { describe, expect, it } from 'vitest';
import { services, searchContent, products, getProductPage, newsCategories, getNewsArticles } from '@/lib/portal-data';
describe('SHOLOK portal rules',()=>{
 it('organizes news into the eight requested categories',()=>{
  expect(newsCategories).toEqual(['National','Politics','Business','World','Health','Sports','Entertainment','Lifestyle']);
 });
 it.each(newsCategories)('shows five distinct matching news articles in %s',category=>{
  const articles=getNewsArticles(category);
  expect(articles).toHaveLength(5);
  expect(new Set(articles.map(article=>article.id)).size).toBe(5);
  expect(articles.every(article=>article.category===category)).toBe(true);
 });
 it('provides publication times for all five news stories',()=>{
  expect(getNewsArticles('National').map(article=>article.time)).toEqual(['1 hour ago','2 hours ago','3 hours ago','4 hours ago','5 hours ago']);
  expect(getNewsArticles('National').map(article=>article.timeBn)).toEqual(['1 ঘণ্টা আগে','2 ঘণ্টা আগে','3 ঘণ্টা আগে','4 ঘণ্টা আগে','5 ঘণ্টা আগে']);
 });
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