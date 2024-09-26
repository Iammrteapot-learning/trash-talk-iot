import subprocess
import time
from gpiozero import LightSensor, DistanceSensor

class TrashState:
    def __init__(self):

        # open, close
        self.light_state = "close"

        # full, empty
        self.distance_state = "empty"

        self.open_time = None
        self.light_level = 0
        self.distance = 0

    def set_light_level(self, level):
        self.light_level = level
    
    def set_distance(self, distance):
        self.distance = distance

    def get_light_level(self):
        return self.light_level
    
    def get_distance(self):
        return self.distance
    
    def get_data(self):
        return {
            "light_level": self.get_light_level(),
            "distance": self.get_distance()
        }
    
    def update_state(self, light_level, distance):
        self.set_light_level(light_level)
        self.set_distance(distance)

        # Check if the light level is high
        if self.get_light_level() > 93:
            
            self.light_state = "open"
            # if self.open_time == None:
            #     self.open_time = datetime.now()
            # if self.open_time != None:
            #     if datetime.now() - self.open_time > datetime.timedelta(seconds=5):
            #         self.shout()
            #         self.open_time = None
        else:
            # If previous state is open, set the open time to None
            if self.light_state == "open":
                self.open_time = None

            self.light_state = "close"
        
        # Check if the distance is low
        if self.get_distance() < 10:
            self.distance_state = "full"
        else:
            self.distance_state = "empty"

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
    subprocess.call(["mpv", "chunasung.mp3"])

def main():
    trash_state = TrashState()
    init_distance_sensor()

    while True:
        try:
            light_level = ldr_read()
            trash_state.update_state(light_level, trash_state.get_distance())
            
            distance = ultrasonic_read()
            trash_state.update_state(trash_state.get_light_level(), distance)

            time.sleep(2)
        except Exception as e:
            print(e)
            time.sleep(5)
            pass

if __name__ == "__main__":
    main()
