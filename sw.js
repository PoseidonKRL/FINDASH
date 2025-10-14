const CACHE_NAME = 'findash-cache-v1';

// Arquivos do "app shell" que são essenciais para o funcionamento offline.
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx', // Em um build real, seria o bundle JS
  '/public/manifest.json',
  '/public/icon.svg',
];

// Evento de instalação: abre o cache e armazena os arquivos essenciais.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de ativação: limpa caches antigos para manter tudo atualizado.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch: intercepta as requisições para servir do cache ou da rede.
self.addEventListener('fetch', event => {
  // Ignora requisições que não são GET.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Estratégia: Stale-While-Revalidate
  // Responde com o cache imediatamente se disponível (stale), 
  // e em paralelo, busca uma versão atualizada na rede para revalidar o cache.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Se a resposta da rede for válida, atualiza o cache.
          if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
            console.error('Fetch falhou; usando o cache se disponível.', err);
        });

        // Retorna a resposta do cache imediatamente, ou aguarda a rede se não houver cache.
        return response || fetchPromise;
      });
    })
  );
});
