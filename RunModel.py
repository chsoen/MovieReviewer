import json

import boto3

SENTIMENT_TYPES = {
    'POSITIVE',
    'NEGATIVE',
    'NEUTRAL',
    'MIXED'
}

client = boto3.client('comprehend')

def lambda_handler(event, context):

    textlist = event['textlist']
    sentimentDict = client.batch_detect_sentiment(
        TextList=textlist,
        LanguageCode='en'
        )
    
    resultList = sentimentDict['ResultList']
    for sentiment in resultList:
        prediction = sentiment['Sentiment']
        score = sentiment['SentimentScore']
        print(prediction)
        print(score)
    
    
    sentimentCounts = {}
    for sentiment_type in SENTIMENT_TYPES:
        sentimentsOfType = list(filter(lambda sentiment: sentiment['Sentiment'] == 'POSITIVE', resultList))
        sentimentCounts[sentiment_type] = len(sentimentsOfType)

    print(sentimentCounts)
    return sentimentCounts