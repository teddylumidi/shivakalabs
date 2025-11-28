#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 5000
HANDLER = http.server.SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("0.0.0.0", PORT), HANDLER) as httpd:
    print(f"Server running at http://0.0.0.0:{PORT}/")
    print("Serving index.html")
    httpd.serve_forever()
