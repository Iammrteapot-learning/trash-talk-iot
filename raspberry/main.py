import subprocess
import time
from gpiozero import LightSensor, DistanceSensor
import requests

def post_data_to_api(url, data):
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()  # Return the response in JSON format
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

class TrashState:
    def __init__(self):

        # opened, closed, forgot
        self.light_state = "closed"

        self.start_time = None
        self.light_level = 0
        self.talk = 0
        self.distance = 0
        
        self.magic_number = 95
        self.url = "http://localhost:3000/data"

    def set_light_level(self, level):
        self.light_level = level

    def set_talk(self, talk):
        self.talk = talk
    
    def set_distance(self, distance):
        self.distance = distance

    def get_light_level(self):
        return self.light_level
    
    def get_talk(self):
        return self.talk
    
    def get_distance(self):
        return self.distance
    
    def get_data(self):
        return {
            "talk": self.get_talk(),
            "distance": self.get_distance()
        }
    
    def update_state(self, light_level, distance):
        self.set_light_level(light_level)
        self.set_distance(distance)
        data = self.get_data()
        post_data_to_api(self.url, data)
        self.talk = 0

        if (self.light_state == "closed"):
            self.start_time = None
            if (self.light_level >= self.magic_number):
                self.light_state = "opened"
                self.start_time = time.time()
            elif (self.distance < self.magic_number):
                # Stay in closed state
                self.light_state = "closed"

        if (self.light_state == "opened"):
            if (self.light_level < self.magic_number):
                self.light_state = "closed"
            elif (self.distance >= self.magic_number):
                self.light_state = "opened"

                # 5 seconds passed
                if (time.time() - self.start_time > 5):
                    self.light_state = "forgot"

        if (self.light_state == "forgot"):
            self.shout()
            self.light_state = "closed"
            self.talk = 1
        

    def shout(self):
        print("Ayo! Close the lid!")
        speaker_play()

def init_distance_sensor():
	TRIG = 11  # define the 16 ---input
	ECHO = 12  # define the 18 ---output
	global distSensor
	distSensor = DistanceSensor(echo=ECHO, trigger=TRIG, max_distance=300)

def ldr_read():
    ldr = LightSensor("BOARD7")
    ldr_value = ldr.value * 100
    print(ldr_value)
    return ldr_value

def ultrasonic_read():
    d = distSensor.distance * 100
    print(f'Distance: {d}')
    return (d)

def speaker_play():
    # Trash Talk Time
    print("Speaker Play")
    subprocess.call(["mpv", "voice.mp3"])

def main():
    trash_state = TrashState()
    init_distance_sensor()

    while True:
        try:
            light_level = ldr_read()            
            distance = ultrasonic_read()
            trash_state.update_state(light_level=light_level, distance=distance)

            time.sleep(1)
        except Exception as e:
            print(e)
            time.sleep(5)
            pass

if __name__ == "__main__":
    main()
