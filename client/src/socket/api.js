export async function manualRefresh() {
  return new Promise((resolve) => {
    this.socket.emit('manualRefresh', 'xxx', (pages) => {
      resolve(pages);
    });
  });
}

export async function test(n = 0) {
  // this.socket.send('manualRefresh');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('test', this);
      resolve(100 * n);
    }, 1000);
  });
}
