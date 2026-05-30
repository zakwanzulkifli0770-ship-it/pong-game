# Pong Game 🎮

A classic Pong game implementation in JavaScript. Play against an AI opponent in this retro-style arcade game.

## 🚀 Play Now

**[Play the Game Here](https://zakwanzulkifli0770-ship-it.github.io/pong-game/)**

## 📋 Features

- Classic Pong gameplay with AI opponent
- Score tracking and real-time updates
- Smooth paddle movement with keyboard and mouse control
- Ball physics with collision detection
- Responsive design
- Clean, retro-style UI

## 🎮 How to Play

### Controls
- **Mouse** - Move your paddle vertically by moving the mouse
- **Arrow Keys** - Use Up/Down arrows to move your left paddle
- Hit the ball with your paddle to score points
- First to score more points wins!

### Game Mechanics
- Ball bounces off top and bottom walls
- Paddles stop at game boundaries
- Ball speed increases slightly with each paddle hit
- AI opponent automatically tracks and hits the ball

## 🛠️ Technologies Used

- **HTML5** - Game structure and canvas layout
- **CSS3** - Styling, animations, and responsive design
- **Vanilla JavaScript** - Game logic, AI, and physics engine

## 📦 Project Structure

```
pong-game/
├── index.html      # Main game interface
├── style.css       # Game styling and animations
├── script.js       # Game logic and AI opponent
├── package.json    # Project metadata
├── README.md       # This file
└── todo/           # Additional todo app project
```

## 🚀 Local Development

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/zakwanzulkifli0770-ship-it/pong-game.git
cd pong-game
```

2. Open in your browser:
```bash
# Simply open the index.html file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

3. Start playing!

### Using a Local Server (Optional)

For better compatibility, you can run a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
http-server
```

Then visit `http://localhost:8000` in your browser.

## 🌐 Deployment

This game is automatically deployed using **GitHub Pages**. 

- **Live URL**: https://zakwanzulkifli0770-ship-it.github.io/pong-game/
- **Auto-deployment**: Any changes pushed to the `main` branch are automatically deployed

### Deploy Your Own Fork

1. Fork this repository
2. Go to Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `main` branch
5. Your game will be live at `https://yourusername.github.io/pong-game/`

## 🎯 Game Constants

You can customize the game by modifying these constants in `script.js`:

```javascript
const GAME_WIDTH = 800;      // Game board width
const GAME_HEIGHT = 400;     // Game board height
const PADDLE_HEIGHT = 80;    // Paddle height
const BALL_SPEED = 5;        // Initial ball speed
const AI_SPEED = 4;          // AI paddle speed
```

## 🐛 Known Issues

- None currently reported!

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created by [zakwanzulkifli0770-ship-it](https://github.com/zakwanzulkifli0770-ship-it)

## 🤝 Contributing

Feel free to fork this repository and submit pull requests with improvements!

---

**Enjoy the game! 🏓** 

Got feedback or suggestions? Open an issue on GitHub!
