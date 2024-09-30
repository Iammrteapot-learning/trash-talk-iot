from gpiozero import DistanceSensor
import time


def singleDistanceCm():
	d = distSensor.distance * 100
	print(f'Distance: {d}')
	return (d)

def init():
	TRIG = 11  # define the 16 ---input
	ECHO = 12  # define the 18 ---output
	global distSensor
	distSensor = DistanceSensor(echo=ECHO, trigger=TRIG, max_distance=300)

init()
while(True):
	print(f"singleDistanceCm()->{singleDistanceCm()}")
	time.sleep(1)
