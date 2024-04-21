function randomTimeGenerator() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    return { hour, min, sec }; // Return current time
}

module.exports = randomTimeGenerator;