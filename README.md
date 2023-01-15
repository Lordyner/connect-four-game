# Frontend Mentor - Connect Four game solution

This is a solution to the [Connect Four game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/connect-four-game-6G8QVH923s). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the game rules
- Play a game of Connect Four against another human player (alternating turns on the same computer)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the discs animate into their position when a move is made
- **Bonus**: Play against the computer

### Screenshot

![](./Screenshot%202023-01-14%20at%2014-56-45%20React%20App.png)


### Links

- Solution URL: [https://lordyner.github.io/connect-four-game/]

## What I learned

I learned how to use grid to solve responsive problems that can't be solve with flexboxs. For example we don't have the same layouts between mobile/tablet and desktop. In mobile/tablet the score boards are above the game board but in desktop, the game board is in between the two score board.

```css
.grid-container {
      display: grid;
      gap: 0 1.25rem;


      grid-template-areas:
        "ingame-header ingame-header"
        "score-board-player-one score-board-player-two"
        "game-board game-board";

      @media (min-width: variables.$tablet) {
        gap: 0 3.75rem;
      }

      @media (min-width: variables.$desktop) {
        grid-template-areas:
          "ingame-header ingame-header ingame-header"
          "score-board-player-one game-board score-board-player-two";
        align-items: center;
        justify-items: center;
      }
}
```

I learned that I should be more careful of small details during my first analyze, regarding layout, or animations, or functionnality and there implications on the code. 

I also learned that using decrement on state doesn't work 

```js
setCounter(counter--); 

```



### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### Built with


### Continued development

I want to keep learning how React works and how "real world React project works". I also want to improve in algorithm. My solution to check if a player won is working but it feels like it could be easily improved and cleaned.


### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.


## Author

- Frontend Mentor - [@Lordyner](https://www.frontendmentor.io/profile/Lordyner)
- Linkedin - (https://www.linkedin.com/in/thomas-andre-lubin-988760111/)

## Acknowledgments

Thanks to the Dev'Area community (https://devarea.fr/) that helps me with some issues that I had with the timer.
