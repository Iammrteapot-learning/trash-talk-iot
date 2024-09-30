import RPi.GPIO as GPIO
import time

# Define the GPIO pin you are using
gpio_pin = int(input())  # Change to your GPIO pin number

# Setup GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(gpio_pin, GPIO.IN)

try:
    while True:
        pin_status = GPIO.input(gpio_pin)
        if pin_status:
            print(f"Pin {gpio_pin} is HIGH")
        else:
            print(f"Pin {gpio_pin} is LOW")
        time.sleep(1)  # Check every second

except KeyboardInterrupt:
    print("Stopped by User")

finally:
    GPIO.cleanup()

