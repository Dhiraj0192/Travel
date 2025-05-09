// public/service-worker.js
self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.json() : {};
    const title = payload.title || 'Notification';
    
    event.waitUntil(
      self.registration.showNotification(title, {
        body: payload.body,
        icon: payload.icon || '/logo192.png',
        data: payload.data
      })
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  });