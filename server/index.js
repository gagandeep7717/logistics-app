const express = require("express");
const cors = require("cors");
require('dotenv').config();
const supabase = require('./config/supabase');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

// Test Supabase connection
app.get("/test-db", async (req, res) => {
  try {
    // Try to fetch a row from any table, for example 'users' table
    const { data, error } = await supabase
      .from('users')  // Replace 'users' with any table name you have in your Supabase
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    res.json({
      success: true,
      message: "Successfully connected to Supabase",
      data: data
    });
  } catch (error) {
    console.error('Supabase connection error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to connect to Supabase",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
