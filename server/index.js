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
    // First test the basic connection
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Not Set');
    console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not Set');

    // List all tables
    const { data: tables, error: tablesError } = await supabase
      .from('_tables')
      .select('*');

    if (tablesError) {
      console.error('Error fetching tables:', tablesError);
      throw new Error('Failed to fetch tables: ' + tablesError.message);
    }

    res.json({
      success: true,
      message: "Successfully connected to Supabase",
      tables: tables,
      env: {
        hasUrl: !!process.env.SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_ANON_KEY
      }
    });
  } catch (error) {
    console.error('Supabase connection error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to connect to Supabase",
      error: error.message,
      env: {
        hasUrl: !!process.env.SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_ANON_KEY
      }
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
