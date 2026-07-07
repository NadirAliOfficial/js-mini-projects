const API_KEY = 'YOUR_API_KEY'; // Get free key at openweathermap.org
const input = document.getElementById('city-input');
const btn = document.getElementById('search-btn');
const weatherEl = document.getElementById('weather');
const errorEl = document.getElementById('error');

async function fetchWeather(city) {
  weatherEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('Not found');
    const d = await res.json();
    document.getElementById('city-name').textContent = `${d.name}, ${d.sys.country}`;
    document.getElementById('temp').textContent = `${Math.round(d.main.temp)}°C`;
    document.getElementById('desc').textContent = d.weather[0].description;
    document.getElementById('humidity').textContent = `💧 ${d.main.humidity}%`;
    document.getElementById('wind').textContent = `💨 ${d.wind.speed} m/s`;
    weatherEl.classList.remove('hidden');
  } catch {
    errorEl.classList.remove('hidden');
  }
}

btn.addEventListener('click', () => { const c = input.value.trim(); if (c) fetchWeather(c); });
input.addEventListener('keydown', e => e.key === 'Enter' && btn.click());
