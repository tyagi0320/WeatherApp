# 🌤️ Weather App  

A **Web Weather App** that fetches real-time weather data using the **Visual Crossing Weather API** and displays a **7-day forecast with graphs** using **React.js (Frontend) & Node.js (Backend)**.

---

## 📌 Features  
✅ **Search for any city** and get live weather updates.  
✅ **Current temperature, humidity, wind speed, & weather condition**.  
✅ **7-day weather forecast** displayed as a graph.  
✅ **Fully responsive UI** using Bootstrap.  
✅ **Interactive charts** powered by `react-chartjs-2`.  

---

## 🚀 Getting Started  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

---

### **2️⃣ Backend Setup**  
```bash
cd backend
npm install
```

**Create a `.env` file** inside `backend/` and add your API key:  
```env
WEATHER_API_KEY=YOUR_VISUAL_CROSSING_API_KEY
PORT=5000
```

Run the backend server:  
```bash
npm start
```

---

### **3️⃣ Frontend Setup**  
```bash
cd ../frontend
npm install
```

Update `src/components/WeatherApp.js` with your backend API URL:  
```js
const response = await axios.get("http://localhost:5000/weather?city=London");
```

Start the React frontend:  
```bash
npm start
```

---

## 📡 API Usage  

- **Get current weather:**  
  ```
  GET /weather?city=London
  ```
- **Get historical & forecast data:**  
  ```
  GET /weather?city=London&date1=2024-03-20&date2=2024-03-27
  ```

---

## 🎨 Technologies Used  
- **Frontend:** React.js, Bootstrap, Chart.js  
- **Backend:** Node.js, Express.js, Axios  
- **API:** [Visual Crossing Weather API](https://www.visualcrossing.com/)  

---

## 📸 Screenshots  

### Home Page  
![Home Page](Screenshots/Screenshot%201.png)

### Graph View  
![Weather details](Screenshots/Screenshot%202.png)

### Weather Forecast  
![7-day Forecast](Screenshots/Screenshot%203.png)

---

## 🛠️ Future Enhancements  
- 🌎 Allow users to **search weather by coordinates** (latitude/longitude).  
- 🌙 Add **dark mode support**.  
- 📊 More **detailed charts** (hourly breakdown).  

---

## 🤝 Contributing  
Feel free to **fork this repo** and submit a pull request. 🚀  

---

## 📜 License  
This project is open-source and available under the **MIT License**.  
You are free to use, modify, and distribute this software with proper attribution.  
See the [LICENSE](./LICENSE) file for more details.
