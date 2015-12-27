#!/usr/bin/env python

import time
import datetime
import random
import requests

URL = 'https://script.google.com/macros/s/AKfycbxOw-Tl_r0jDV4wcnixdYdUjcNipSzgufiezRKr28Q5OAN50cIP/exec'

def gdoc_post(data):
    csv = "\n".join(
        ",".join(str(it) for it in line) for line in data
    )

    requests.post(URL + "?sheet=Raw", csv)

def make_temperature():
    return random.randrange(230, 250) / 10.

def make_humidity():
    return random.randrange(400, 500) / 10.
    
def make_power():
    return random.randrange(1000, 2000)

if __name__ == '__main__':
    now = time.time()
    for i in xrange(60):
        timestamp = now + 60 * 60 * i
        date = datetime.datetime.fromtimestamp(timestamp)

        data = [
            [timestamp, date, 'kitchen', 'temperature', make_temperature()],
            [timestamp, date, 'kitchen', 'humidity', make_humidity()],
            [timestamp, date, 'bedroom', 'temperature', make_temperature()],
            [timestamp, date, 'bedroom', 'humidity', make_humidity()],
            [timestamp, date, 'hallway', 'temperature', make_temperature()],
            [timestamp, date, 'hallway', 'humidity', make_humidity()],
            [timestamp, date, 'general', 'power', make_power()],
        ]

        gdoc_post(data)
