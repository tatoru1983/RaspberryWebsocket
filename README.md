# RaspberryWebsocket
Websocket with Raspberry. Open Garage door

Hi all!

This Node js project provides to manage a simple Raspberry and Reley to open a garage door

## Client

The html page is a simple Boostrap html with 3 button:
### Button UP
comands the relay 1 to open the door
### Button DOWN
comands the relay 2 to close the door
### Button STOP
panic button... to close bot relays in case of danger (!!!)

## Server

The node js file manage the GPIO pins 17 and 18 (positions 11 and 12) and implements the metods to anable/disable bot relays connected to the pins


```
NEXT STEP:
connect a LED (or lamp) when the door moves and two sensors to check the door is totally close or totally open
```
