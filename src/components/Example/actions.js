import { TEST } from './constants';


export function count(id) {
  return {
    id,
    type: TEST,
  };
} 


export default {
  count,
}
