#!/usr/bin/env python3
"""
Simple HTTP Server for Portfolio
Run this to view your portfolio locally with PDF support
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add MIME type for PDF
        if self.path.endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"✓ Portfolio running at: {url}")
        print(f"✓ Directory: {DIRECTORY}")
        print(f"\nPress Ctrl+C to stop the server")
        
        # Open browser
        try:
            webbrowser.open(url)
            print(f"✓ Opening browser...")
        except Exception as e:
            print(f"Note: Could not auto-open browser ({e})")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✓ Server stopped")
            exit(0)
