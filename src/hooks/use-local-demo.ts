import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react';
export function useLocalDemo<T>(key:string,initial:T) {
 const [value,setValue]=useState<T>(initial);
 const current=useRef(value);
 current.current=value;
 useEffect(()=>{
  const read=()=>{try {const stored=localStorage.getItem(key);if(stored){const parsed=JSON.parse(stored) as T;current.current=parsed;setValue(previous=>JSON.stringify(previous)===stored?previous:parsed);}} catch {}};
  read();
  const sync=(event:Event)=>{if(event instanceof CustomEvent&&event.detail===key)read();};
  window.addEventListener('sholok-local-update',sync);
  window.addEventListener('storage',read);
  return()=>{window.removeEventListener('sholok-local-update',sync);window.removeEventListener('storage',read);};
 },[key]);
 const update=useCallback((action:SetStateAction<T>)=>{
  const next=typeof action==='function'?(action as (previous:T)=>T)(current.current):action;
  current.current=next;setValue(next);
  try {localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new CustomEvent('sholok-local-update',{detail:key}));} catch {}
 },[key]);
 return [value,update] as const;
}
