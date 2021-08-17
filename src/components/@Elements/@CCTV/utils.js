/* eslint-disable */

import encoding from 'text-encoding';

const decoder = window.TextDecoder ? new window.TextDecoder() : new encoding.TextDecoder();
const encoder = window.TextEncoder ? new window.TextEncoder() : new encoding.TextEncoder();


export function stringToBinary(data) {
  return encoder.encode(data);
}

export function bynaryToString(data) {
  return decoder.decode(data);
}

//---------------------------

export function hashCode(s) {
  var a = 1, c = 0, h, o;
  if (s) {
      a = 0;
      for (h = s.length - 1; h >= 0; h--) {
          o = s.charCodeAt(h);
          a = (a<<6&268435455) + o + (o<<14);
          c = a & 266338304;
          a = c!==0?a^c>>21:a;
      }
  }
  return String(a);
}


export function concatArrays(data) {
  const max = data.reduce((l, n) => l + n.byteLength, 0);
  const temp = new Uint8Array(max);
  let l = 0;
  data.forEach(i => {
    temp.set(new Uint8Array(i), l);
    l = l + i.byteLength;
  })
  return temp;
}