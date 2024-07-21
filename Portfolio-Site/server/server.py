import time
from pynput import keyboard, mouse
import threading
import sqlite3

conn = sqlite3.connect('user_activity.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    keystrokes TEXT,
    mouse_movements TEXT,
    mouse_clicks TEXT,
    mouse_scroll TEXT,
    active_app TEXT,
    browser_activity TEXT,
)
''')

conn.commit()
conn.close()

class UserActivityMonitor:
    def __init__(self, inactivity_threshold=300):
        self.inactivity_threshold = inactivity_threshold
        self.last_activity_time = time.time()
        self.active = True

    def on_press(self, key):
        self.last_activity_time = time.time()

    def on_click(self, x, y, button, pressed):
        self.last_activity_time = time.time()

    def check_activity(self):
        while True:
            current_time = time.time()
            if current_time - self.last_activity_time > self.inactivity_threshold:
                self.active = False
            else:
                self.active = True
            time.sleep(1)

    def get_active_app(self):
        # Dummy function to simulate active app
        return "DummyApp"

    def log_metrics(self):
        while True:
            if self.active:
                # Replace with actual data collection logic
                keystrokes = "dummy_keystrokes"
                mouse_clicks = "dummy_mouse_clicks"
                active_app = self.get_active_app()
                browser_activity = "dummy_browser_activity"

                self.insert_data(keystrokes, mouse_clicks, active_app, browser_activity)
            time.sleep(60)  # Log metrics every minute

    def insert_data(self, keystrokes, mouse_clicks, active_app, browser_activity):
        conn = sqlite3.connect('user_activity.db')
        cursor = conn.cursor()

        cursor.execute('''
        INSERT INTO activity_log (keystrokes, mouse_clicks, active_app, browser_activity)
        VALUES (?, ?, ?, ?)
        ''', (keystrokes, mouse_clicks, active_app, browser_activity))

        conn.commit()
        conn.close()

    def start_monitoring(self):
        keyboard_listener = keyboard.Listener(on_press=self.on_press)
        mouse_listener = mouse.Listener(on_click=self.on_click)

        keyboard_listener.start()
        mouse_listener.start()

        activity_thread = threading.Thread(target=self.check_activity)
        log_thread = threading.Thread(target=self.log_metrics)

        activity_thread.start()
        log_thread.start()

        keyboard_listener.join()
        mouse_listener.join()
        activity_thread.join()
        log_thread.join()

if __name__ == "__main__":
    monitor = UserActivityMonitor()
    monitor.start_monitoring()