function randomTimeGenerator()
{
    let startHour = 0; //12:00 AM
    let endHour = 23; //11:00 PM

    let hour = Math.floor(Math.random() * (endHour - startHour +1)) + startHour;
    let min = Math.floor(Math.random() * 60);
    let sec = Math.floor(Math.random() * 60);

    return hour + ':' + min + ':' + sec; // format for the generated random time
}

//testing the function
var randomTime = randomTimeGenerator();
console.log(randomTime);