# OP-TicTacToe

# Planning
Not entirely sure how I'm going to do this, so I start by following the steps in on the OP project page.  The whole idea seems to be to minimize global code.  I'll organize the javascript into three distinct chunks according to the project requirements:

-The gameboard must be an array inside of a gameboard module.
-Display controller object is a module.
-2 Players object created from a factory function.

I believe this is kind of what I did in a janky kind of way in my OP-Library-App project, just without factory functions or modules.  I had a handfull of giant functions with tons of nested functions, and once the global code ran, it just worked.

So, I guess I'll start from the gameboard out.

# Gameboard Module Pattern
Gameboard is a module.  It wants to house, change, and display game information.  Gameboard boxes are housed in an array within that module.  By default, those array values are empty.  They can also be X, or O.

- Local Array of 9 objects declared. Each object has a 'value' property that is '' by default.  Can also be 'X' or 'O'.  Also a boolean property of written that is false by default.
- Public function that returns current array.
- **Local Write Function that changes an index.value property from empty to O or X depending on the current player's turn, and then changes the written property to true. 
- Returned function that generates the grid divs based on the array.
    - Each div is given class of .gameboardDiv for styling purposes.
    - Each div is given the attribute 'data-value' equal to its array.value string.
        - Same for the array.written values.  data-written=""
    - Each div is given class of .unwritten for styling purposes.
    - Each div is given a click event handler that does the following:
        Against AI, check if it's currently the players turn.  If no, do nothing.
        If yes:
            - Checks if a.target.dataset.written = true.  If it is, do nothing.
            - If it's false:
                - Rewrite array index corresponding to
                target div index to current player's gamepiece (X or O).
                - Set data-value of target div to corresponding array index.
                - Set inner.html of target div to corresponding array index.
                - Set a.target.written to true.
                - Run check if win function.  More controller stuff.
        - Maybe the same thing can be accomplished by returning a promise
        to a function within the controller module.  Cleaner.
            
- Returned function that erases the grid




# Controller Module
Wants to control the pace of the game.  Start.  Communicate whose turn it is.
Determine after each move whether a win state as been reached.

# I kind of started coding here, and finished without planning. :^)  I'll do better next time.
