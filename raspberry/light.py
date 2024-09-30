from gpiozero import LightSensor

ldr = LightSensor("BOARD7")
while True:
    print(ldr.value)