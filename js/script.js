const wrapper = document.querySelector('.wrapper');
const stakes = document.querySelectorAll('.stakes button');
const stake = document.querySelector('#stake');
const totalDisplay = document.querySelector('#total');
const result = document.querySelector('.result');
const playGameBtn = document.querySelector('#playGame');
const barImg1 = document.querySelector('img[alt=slot-1]');
const barImg2 = document.querySelector('img[alt=slot-2]');
const barImg3 = document.querySelector('img[alt=slot-3]');

let pot, total,bar1,bar2,bar3, playTimer, winnings;
pot = 0;
total = 1000; 
playTimer = 50;


totalDisplay.innerText = total;


/* This code is adding a click event listener to each button with the class "stakes". When a button is
clicked, it retrieves the value of the "data-amount" attribute and converts it to an integer using
parseInt(). If the amount is greater than the total balance, it displays an alert message.
Otherwise, it adds the amount to the pot and subtracts it from the total balance. It then updates
the display of the total balance and the pot amount. */
stakes.forEach(btn => {
    btn.addEventListener('click', e => {
        let amount = parseInt(btn.getAttribute('data-amount'));

        if (amount > total) {
            return alert('Insufficient Balance')
        }
        pot += amount;
        total -= amount;


        totalDisplay.innerText = total;
        result.innerText = `$${pot}`;
    })
})



/* This code adds a click event listener to the "Play Game" button. When the button is clicked, it
checks if the pot amount is greater than 0. If it is not, it displays an alert message asking the
user to stake an amount. If the pot amount is greater than 0, it starts a game loop using
setInterval(). */
playGameBtn.addEventListener('click', e => {
    if (pot === 0) {
        return alert('Please stake an amount')
    }
    let track = 0;
    
    const game = setInterval(()=>{
        track++;
        bar1 = Math.floor(Math.random() * 4);
        bar2 = Math.floor(Math.random() * 4);
        bar3 = Math.floor(Math.random() * 4);

        barImg1.setAttribute('src', `images/${bar1}.png`)
        barImg2.setAttribute('src', `images/${bar2}.png`)
        barImg3.setAttribute('src', `images/${bar3}.png`)

        if (track === playTimer) {
            clearInterval(game)
            if (bar1 === 0 && bar2 === 0 && bar3 === 0 ) {
                result.innerText = '!!! JACKPOT !!!';
                total += pot * 5;
                wrapper.classList.add('disco')
                setTimeout(()=>{wrapper.classList.remove('disco'), 3000})
            }
            else if(bar1 === bar2 && bar2 === bar3 && bar1 === bar3 && bar1 != 0 && bar2 != 0 && bar3 != 0 ){

                result.innerText = 'WIN';
                total += pot
            }
            else if(bar1 === bar2 || bar2 === bar3 ){
                winnings = (30/100) * pot;

                result.innerText = 'WIN';
                total += winnings
            }
            
            else{
                result.innerText = "Try Again"
            }

            pot = 0;
            totalDisplay.innerText = total;
        }

    }, 50)
});