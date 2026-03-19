<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect form data
    $name = $_POST['name'];

    // Prepare the data to be written (as an array)
    $data = [$name];

    // Define the filename and open it in append mode
    $filename = "data.csv";
    $file = fopen($filename, "a");

    // Write the data to the CSV file
    fputcsv($file, $data);

    // Close the file
    fclose($file);

    echo "Data saved successfully.";
} else {
    echo "No data submitted.";
}
?>
