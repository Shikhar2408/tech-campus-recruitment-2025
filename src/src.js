import sys
import os

def extract_logs(log_file, target_date, output_dir="output"):
    """
    Extracts logs for the specified date from a large log file efficiently.
    
    :param log_file: Path to the large log file
    :param target_date: Date (YYYY-MM-DD) to filter logs
    :param output_dir: Directory to save the output file
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, f"output_{target_date}.txt")
    
    try:
        with open(log_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
            for line in infile:
                if line.startswith(target_date):  # Fast filtering
                    outfile.write(line)
        print(f"Logs for {target_date} saved to {output_file}")
    except FileNotFoundError:
        print(f"Error: Log file '{log_file}' not found.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python extract_logs.py <log_file> <YYYY-MM-DD>")
        sys.exit(1)
    
    log_file_path = sys.argv[1]
    date_to_extract = sys.argv[2]
    extract_logs(log_file_path, date_to_extract)
