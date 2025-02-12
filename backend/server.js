const express = require("express");
const cors = require("cors");

const app = express();
const queueRoutes = require("./routes/QueueRoutes");
const tellerRoutes = require("./routes/TellerRoutes");

app.use(cors());
app.use(express.json());

app.use("/queue", queueRoutes);
app.use("/teller", tellerRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
