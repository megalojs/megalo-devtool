export async function manualRefresh() {
  this.socket.emit('manualRefresh', 'xxx', (data) => {
    console.log(data);
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
