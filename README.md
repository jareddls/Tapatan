# Website
http://tapatan.vercel.app  

# Things to note
- Minimax doesn't work as intended.
- It does take into consideration the general structure that Python has for minimax from https://github.com/aimacode/aima-python/blob/master/games.py 
  - However, due to most likely error in logic from myself, it is almost seemingly just like the random-move, except that the AI doesn't want to win.
- Still fairly new to React and JavaScript. Started this semester, so the difficulty of even completing a singular search algorithm was difficult, especially for something like Tapatan
  - Making a definitive evaluation function to define a "best move" is extremely difficult, and doing a bigger depth is almost near impossible due to recursion making it slow.
  
# Future Work
- If time permits, I will try my best to fix it.
  - If not, anyone is welcome to make pull requests to solve it as I am leaving it open-source.
- If I do somehow figure this out, I will consider using other search algorithms as well.

# Layout Structure

- The `public` folder is pointless.
- The `src` folder holds all the important files.
- `src/assets` holds all the images and sounds I used for the project.
- `src/components` holds React files that I plan to possibly re-use throughout my code.
  - To elaborate, what I mean is that if I make a `Button` component, I can re-use that component throughout other parts of my code.
    - `Button.jsx` is the component used for the clickable square buttons throughout the webpages.
    - `ButtonCircle.jsx` is the component used for the Tapatan board to have clickable circles.
    - `Tapatan.jsx` is the component the is re-used in different routes to display the entire board.
- `src/integrations` is where I complete all my logic for the AI itself.
  - `minimaxLogic.jsx` is the file that contains how the AI responds in the form of a minimax search algorithm (although it currently is not working)
  - `randomLogic.jsx` is the file that contains how the AI responds in the form of complete randomness.
- `src/pages` is where I store all the code for the GUI/front-end for the page itself.
  - `Difficulty.jsx` is the webpage that displays the two difficulties: Minimax and Random
  - `Landing.jsx` is the webpage that displays the Tapatan title and the Play button.
  - `MiniMax.jsx` is the webpage that displays the board that uses the Minimax logic.
  - `RandomMove.jsx` is the webpage that displays the board that uses the Random logic.
- In the `root` directory of the folder, where `App.jsx` resides, its purpose is to store the routes so that we can visit different pages.
  - `main.jsx` on the other hand, is just what renders our entire webpage, so you do NOT mess with that unless you know what you are doing.


# How to run (locally)

- If you know how to run docker:
  - `docker compose up`
  - `npm run dev`
  
- If you want to do it the way I do it:
  - `npm i`, so that we can install the missing packages to the `node_modules` that come from `package.json`.
  - `npm run dev`
  
# Requirement(s)
As far as I'm aware, the only requirement to get started would be having:
- Node.js
