import json
import requests
from collections import Counter


def numberOfDates(data):
	counter = 0
	for key in data:
		counter += 1
	return counter

def findTop5Highest(data):
	num = numberOfDates(data)
	k = Counter(data)
	printCounter = num

	if num < 5:
		high = k.most_common(num)
	else:
		high = k.most_common(5)
		printCounter = 5

	highDict = {}
	
	for i in high:
		highDict[i[0]] = i[1]

	return highDict


def feelingNumber(feeling):

	if feeling == 'Fantastic':
		return 100

	elif feeling == 'Ok':
		return 50

	elif feeling == 'Frustrated':
		return 0

def getFinalValues(feelingsCompare, dataDict):

	num = numberOfDates(feelingsCompare)
	tempAverage = 0
	noiseAverage = 0
	humiAverage = 0
	brightAverage = 0

	for key in feelingsCompare:
		tempAverage += dataDict[key]['tempAverage']
		noiseAverage += dataDict[key]['noiseAverage']
		humiAverage += dataDict[key]['humiAverage']
		brightAverage += dataDict[key]['brightAverage']

	tempAverage /= num
	noiseAverage /= num
	humiAverage /= num
	brightAverage /= num

	tempAverage = round(tempAverage, 2)
	noiseAverage = round(noiseAverage, 2)
	humiAverage = round(humiAverage, 2)
	brightAverage = round(brightAverage, 2)

	finalDict = {
		"tempAverage": tempAverage,
		"humiAverage": humiAverage,
		"noiseAverage": noiseAverage,
		"brightAverage":brightAverage
	}


	return finalDict


def calculate_function(feelings, data):

	feelingsDict = {}
	feelingsTop = {}
	dataDict = {}

	for line in feelings:
		jsonTemp = line
		keyTemp = jsonTemp['time']['date']
		if keyTemp in feelingsDict.keys():
			feelingsDict[keyTemp]['value'] += feelingNumber(jsonTemp['feeling'])
			feelingsDict[keyTemp]['people'] += 1
		else:
			feelingsDict[keyTemp] = {}
			feelingsDict[keyTemp]['value'] = feelingNumber(jsonTemp['feeling'])
			feelingsDict[keyTemp]['people'] = 1

	for key in feelingsDict:
		feelingsTop[key] = feelingsDict[key]['value']/feelingsDict[key]['people']

	
	for line in data:
		jsonTemp = line
		keyTemp = jsonTemp['time']['date']
		if keyTemp in dataDict.keys():
			dataDict[keyTemp]['counter'] += 1
			dataDict[keyTemp]['temperature'] += jsonTemp['temperature']
			dataDict[keyTemp]['humidity'] += jsonTemp['humidity']
			dataDict[keyTemp]['noise'] += jsonTemp['noise']
			dataDict[keyTemp]['brightness'] += jsonTemp['brightness']
		else:
			dataDict[keyTemp] = {}
			dataDict[keyTemp]['counter'] = 1
			dataDict[keyTemp]['temperature'] = jsonTemp['temperature']
			dataDict[keyTemp]['humidity'] = jsonTemp['humidity']
			dataDict[keyTemp]['noise'] = jsonTemp['noise']
			dataDict[keyTemp]['brightness'] = jsonTemp['brightness']

	for key in dataDict:
		dataDict[key]['tempAverage'] = dataDict[key]['temperature']/dataDict[key]['counter']
		dataDict[key]['humiAverage'] = dataDict[key]['humidity']/dataDict[key]['counter']
		dataDict[key]['noiseAverage'] = dataDict[key]['noise']/dataDict[key]['counter']
		dataDict[key]['brightAverage'] = dataDict[key]['brightness']/dataDict[keyTemp]['counter']
	
	feelingsCompare = findTop5Highest(feelingsTop)
	
	print(json.dumps(getFinalValues(feelingsCompare, dataDict)))


feelings = requests.post('http://192.168.1.27:3000/feeling/getAll')
feelingsJSON = feelings.json()

data = requests.post('http://192.168.1.27:3000/data/getData')
dataJSON = data.json()


calculate_function(feelingsJSON, dataJSON)