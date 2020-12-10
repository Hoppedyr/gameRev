
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from time import sleep
import re
import operator
from selenium.webdriver.common.keys import Keys

from webdriver_manager.chrome import ChromeDriverManager

import pika
import sys

import requests
import bs4
import json
import datetime

from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()
print("Webscraping Scheduler started")
@sched.scheduled_job('interval', minutes=10)
def timed_job():
    # %pip install selenium
    # %pip install webdriver_manager
    # %pip install pika
    
    print("Starting webscraper")
    
    URL = 'https://www.steamspy.com/search.php'

    browser = webdriver.Chrome(ChromeDriverManager().install())

    games = ['Grand Theft Auto V', 'Portal 2', 'The Witcher 3: Wild Hunt', 'Tomb Raider (2013)', 'The Elder Scrolls V: Skyrim',
             'Left 4 Dead 2', 'Borderlands 2', 'Fallout 4', 'PAYDAY 2', 'Grand Theft Auto IV', 'DOOM (2016)','BioShock',
             'Half-Life 2', 'Red Dead Redemption 2', 'Limbo','Counter-Strike: Global Offensive', 'Life is Strange',
             'Team Fortress 2', 'BioShock Infinite']

    # games = ['Grand Theft Auto V', 'Portal-2']
    # games = ['Portal-2']

    gameInfos = []

    for game in games:
        browser.get(URL)
    #     browser.implicitly_wait(1)
        search_field = browser.find_element_by_xpath('/html/body/div[3]/div[2]/div[1]/div[2]/div/div/div/div/div/form/div/input')
        search_field.send_keys(game)
        search_field.submit()
        getInfo = browser.find_element_by_xpath('/html/body/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div/p').text

        if getInfo.find("Price:") != -1:
            cleanData = getInfo[getInfo.find("Price:"):].split('\n')
            del cleanData[1]
            wat700 = "".join(cleanData).replace("Owners", ";Owners").replace(': ', "=")
            dictionary = dict(subString.split('=') for subString in wat700.split(";")) 

            dictionary["Game"] = game
            gameInfos.append(dictionary)

    browser.close()
    jsonData = json.dumps(gameInfos)
    print(jsonData)


    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange='gamerevWebscraper', exchange_type='fanout')

    channel.queue_declare(queue='webscrapeData')
    channel.queue_declare(queue='webscrapeData2')

    channel.queue_bind(exchange='gamerevWebscraper', queue="webscrapeData")
    channel.queue_bind(exchange='gamerevWebscraper', queue="webscrapeData2")

    channel.basic_publish(exchange='gamerevWebscraper', routing_key='', body=jsonData)
    print(" [x] Sent %r" % jsonData)
    connection.close()

    print("Webscraper scheduler job has run at %s" % datetime.datetime.now())

timed_job()
sched.start()



