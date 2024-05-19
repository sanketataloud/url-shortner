const gracefulShutdown = async (server) => {
    try {
      console.info('Closed database connection!');
      server.close();
      process.exit();
    } catch (error) {
      console.info(error.message);
      process.exit(1);
    }
  };
  
  export { gracefulShutdown };
  