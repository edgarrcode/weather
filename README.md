# 🌤️ Weather Dashboard

A modern, responsive weather dashboard built with Next.js and the OpenWeatherMap API. Search for any city worldwide or use your current location to get real-time weather information.

![Weather Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🔍 **City Search** - Search weather for any city worldwide
- 📍 **Geolocation** - Get weather for your current location with one click
- 🌡️ **Temperature Toggle** - Switch between Celsius and Fahrenheit
- 💨 **Detailed Weather Info** - View temperature, feels like, humidity, wind speed, and visibility
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- ⚡ **Real-time Data** - Live weather updates from OpenWeatherMap API
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** JavaScript (React)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** OpenWeatherMap API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/edgarrcode/weather.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Get your API key**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API Keys section
   - Generate a new API key (may take 10-15 minutes to activate)

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

   > ⚠️ **Important:** Never commit your `.env.local` file to version control!

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
weather-app/
├── app/
│   ├── page.js              # Main page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── components/
│   └── WeatherDashboard.jsx # Weather dashboard component
├── public/                  # Static assets
├── .env.local              # Environment variables (not committed)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies
```

## 🎯 Usage

### Search by City
1. Type a city name in the search bar
2. Press Enter or click the "Search" button
3. View the current weather conditions

### Use Current Location
1. Click the "Use My Location" button
2. Allow location access when prompted
3. Your local weather will be displayed

### Toggle Temperature Units
- Click the °C/°F button in the top-right corner to switch between Celsius and Fahrenheit

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

Create a `.env.local` file based on `.env.example` and add your API key.

## 🚧 Future Enhancements

- [ ] 5-day weather forecast
- [ ] Hourly forecast breakdown
- [ ] Save favorite cities (localStorage)
- [ ] Weather maps and radar
- [ ] Air quality index
- [ ] Sunrise and sunset times
- [ ] Weather alerts and warnings
- [ ] Multiple location comparison
- [ ] Dark mode toggle
- [ ] Weather history and trends

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)

## 📧 Contact

Edgar E. Rodriguez - [@edgarr_com](https://x.com/edgarr_com) - hello@edgarr.com

Project Link: [https://github.com/edgarrcode/weather](https://github.com/edgarrcode/weather)

---

⭐ If you found this project helpful, please consider giving it a star!