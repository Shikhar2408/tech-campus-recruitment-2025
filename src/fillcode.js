const fs = require("fs");
const readline = require("readline");
const path = require("path");

async function extractLogs(logFile, targetDate) {
    if (!fs.existsSync(logFile)) {
        console.error("Error: Log file not found.");
        process.exit(1);
    }

    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputFile = path.join(outputDir, `output_${targetDate}.txt`);
    const readStream = fs.createReadStream(logFile, { encoding: "utf8" });
    const writeStream = fs.createWriteStream(outputFile, { encoding: "utf8" });

    const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

    console.log(`Extracting logs for ${targetDate}...`);

    let count = 0;
    for await (const line of rl) {
        if (line.startsWith(targetDate)) {
            writeStream.write(line + "\n");
            count++;
        }
    }

    writeStream.end();
    console.log(`Extraction complete. Found ${count} log entries.`);
    console.log(`Logs saved to: ${outputFile}`);
}

// Read arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error("Usage: node extract_logs.js <log_file> <YYYY-MM-DD>");
    process.exit(1);
}

const [logFile, targetDate] = args;
extractLogs(logFile, targetDate).catch((err) => console.error("Error:", err));
