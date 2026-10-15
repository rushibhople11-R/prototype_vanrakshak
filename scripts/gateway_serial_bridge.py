"""
VanRakshak LoRa Gateway USB Serial Bridge
Reads raw 16-byte hex packets printed over USB Serial and forwards them
via HTTP POST to the VanRakshak Next.js /api/gateway/uplink route.
"""

import sys
import time
import argparse
import urllib.request
import json

try:
    import serial
except ImportError:
    print("[ERROR] pyserial is required. Install with: pip install pyserial")
    sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="VanRakshak Gateway Serial Bridge")
    parser.add_argument("--port", default="COM3", help="Serial port (e.g., COM3, /dev/ttyUSB0)")
    parser.add_argument("--baud", type=int, default=115200, help="Baud rate")
    parser.add_argument("--url", default="http://localhost:3000/api/gateway/uplink", help="Uplink API URL")
    args = parser.parse_args()

    print(f"[*] Opening serial port {args.port} @ {args.baud} baud...")
    try:
        ser = serial.Serial(args.port, args.baud, timeout=1.0)
    except Exception as e:
        print(f"[!] Could not open serial port: {e}")
        return

    print(f"[*] Forwarding packets to: {args.url}")
    print("[*] Listening for incoming LoRa packet frames... Press Ctrl+C to exit.\n")

    while True:
        try:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if not line:
                continue

            # Expected gateway serial format: "PKT: <32-char-hex> RSSI: -104 SNR: 7.2"
            if "PKT:" in line or len(line) == 32:
                print(f"[RX SERIAL] {line}")
                parts = line.split()
                hex_payload = ""
                rssi = -100
                snr = 6.0

                for i, p in enumerate(parts):
                    if len(p) == 32 and all(c in "0123456789abcdefABCDEF" for c in p):
                        hex_payload = p
                    elif p.upper() == "RSSI:" and i + 1 < len(parts):
                        try:
                            rssi = int(parts[i + 1])
                        except ValueError:
                            pass
                    elif p.upper() == "SNR:" and i + 1 < len(parts):
                        try:
                            snr = float(parts[i + 1])
                        except ValueError:
                            pass

                if not hex_payload and len(line) == 32:
                    hex_payload = line

                if hex_payload:
                    payload_data = {
                        "raw_payload_hex": hex_payload,
                        "gateway_id": f"GW-SERIAL-{args.port}",
                        "rssi": rssi,
                        "snr": snr,
                        "is_simulated": False
                    }

                    req = urllib.request.Request(
                        args.url,
                        data=json.dumps(payload_data).encode('utf-8'),
                        headers={'Content-Type': 'application/json'}
                    )

                    try:
                        with urllib.request.urlopen(req) as response:
                            res_body = response.read().decode('utf-8')
                            print(f"[UPLINK OK] Server response: {res_body}\n")
                    except Exception as http_err:
                        print(f"[UPLINK ERROR] Failed to send to server: {http_err}\n")

        except KeyboardInterrupt:
            print("\n[*] Exiting bridge.")
            break
        except Exception as e:
            print(f"[!] Loop error: {e}")
            time.sleep(1)


if __name__ == "__main__":
    main()
