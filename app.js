const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

//REALLY WELL DOCUMENTED !! :-D

app.use(bodyParser.json());

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const {
      full_name,
      dob,
      college_email,
      college_roll_number,
      numbers,
      alphabets,
    } = req.body;

    // Validate input (you can add more validation as needed)

    // Generate user_id
    const user_id = generateUserId(full_name, dob);

    // Find the highest alphabet in the alphabets array
    const highest_alphabet = findHighestAlphabet(alphabets);

    // Create response JSON
    const response = {
      status: "Success",
      user_id: user_id,
      college_email_id: college_email,
      college_roll_number: college_roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  try {
    // Your GET endpoint doesn't require any input

    // Create response JSON
    const response = {
      operation_code: 1,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Helper function to generate a user ID
function generateUserId(fullName, dob) {
  // Implement your user ID generation logic here
  // For example, you can use the initials from the full name and date of birth
  const formattedDob = dob.replace(/-/g, ""); // Assuming the date of birth is in the format "yyyy-mm-dd"
  return `${fullName}_${formattedDob}`;
}

// Helper function to find the highest alphabet in an array
function findHighestAlphabet(alphabets) {
  // Implement your logic to find the highest alphabet here
  // For example, you can use JavaScript's Math.max function
  return String.fromCharCode(
    Math.max(...alphabets.map((alphabet) => alphabet.charCodeAt(0)))
  );
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
