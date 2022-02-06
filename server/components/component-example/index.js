const componentExample = (app) => {
  return (client) => {
    /**
     * Person entered message from client
     */
    client.on('messageFromClient', (data) => {
      console.log(`Received data from front end in Example Component: ${data}`);
      client.emit('messageFromServer', {
        exampleData: true
      });
    });
  };
};

module.exports = { componentExample };
