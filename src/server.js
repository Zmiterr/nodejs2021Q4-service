const { PORT } = require('./common/config');
const app = require('./app');

// app.listen(PORT, () =>
//   console.log(`App is running on http://localhost:${PORT}`)
// );
(async () => {
    const asApp = await app
    try {
        await asApp.listen(PORT)
    } catch (err) {
        asApp.log.error(err)
        process.exit(1)
    }
})()

