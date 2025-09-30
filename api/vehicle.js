export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const { vehicleNumber } = req.query;

  if (!vehicleNumber) {
    return res.status(400).json({ error: "Missing vehicleNumber parameter" });
  }

  // External API URL with query parameter
  const apiUrl = `http://67.205.160.206:5000/api/vehicle/searchvehicle?vehicleNumber=${encodeURIComponent(vehicleNumber)}`;

  try {
    // GET request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Host': '67.205.160.206:5000',
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQ5MGNlZDUxZjk4MTBlNjEyOGM3Y2UiLCJ1c2VyVHlwZSI6IlVzZXIiLCJpYXQiOjE3NTkwNTUwODUsImV4cCI6MTc2NDIzOTA4NX0.uJV1jbFydJUtxBgH4B1yw73Zj2f520Xav85YJRpIMoY'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
