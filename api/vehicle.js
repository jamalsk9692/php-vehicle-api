export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Get vehicleNumber from query string
  const { vehicleNumber } = req.query;

  if (!vehicleNumber) {
    return res.status(400).json({ error: "Missing vehicleNumber parameter" });
  }

  const apiUrl = 'http://67.205.160.206:5000/api/vehicle/searchvehicle';

  try {
    // Send POST request with JSON body
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Host': '67.205.160.206:5000',
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQ5MGNlZDUxZjk4MTBlNjEyOGM3Y2UiLCJ1c2VyVHlwZSI6IlVzZXIiLCJpYXQiOjE3NTkwNTUwODUsImV4cCI6MTc2NDIzOTA4NX0.uJV1jbFydJUtxBgH4B1yw73Zj2f520Xav85YJRpIMoY'
      },
      body: JSON.stringify({ vehicleNumber })
    });

    // Get response text first
    const text = await response.text();

    // Try parsing JSON, if fails return raw text
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON response", response: text });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
