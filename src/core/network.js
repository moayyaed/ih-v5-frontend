import 'whatwg-fetch';


export function fetch() {
  window.fetch('http:///ya.ru')
  .then(function(response) {
    return response.text();
  }).then(function(body) {
    console.log(body);
  })
  console.log('fetch')
}