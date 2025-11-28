#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 5000
HANDLER = http.server.SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), HANDLER) as httpd:
    print(f"Server running at http://0.0.0.0:{PORT}/")
    print("Serving index..jsx as the main page")
    httpd.serve_forever()
