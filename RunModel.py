import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

SENTIMENT_TYPES = {
    'POSITIVE',
    'NEGATIVE',
    'NEUTRAL',
    'MIXED'
}

client = boto3.client('comprehend')
dynamodb = boto3.resource('dynamodb')
movieReviewsTable = dynamodb.Table('MovieReviews')

def lambda_handler(event, context):

    print(event['movie'])
    queryResponse = movieReviewsTable.query(
        KeyConditionExpression=Key('movie').eq(event['movie'])
    )

    textlist = []
    for item in queryResponse['Items']:
        print(item)
        textlist.append(item['review_detail'])

    # https://stackoverflow.com/questions/9671224/split-a-python-list-into-other-sublists-i-e-smaller-lists
    textlist = [textlist[x:x+25] for x in range(0, len(textlist), 25)]

    resultSentiments = []
    for textbatch in textlist:
        sentimentDict = client.batch_detect_sentiment(
            TextList=textbatch,
            LanguageCode='en'
            )
        
        resultSentiments.extend(sentimentDict['ResultList'])
    
    print(resultSentiments)

    sentimentCounts = {}
    for sentiment_type in SENTIMENT_TYPES:
        sentimentsOfType = list(filter(lambda sentiment: sentiment['Sentiment'] == sentiment_type, resultSentiments))
        sentimentCounts[sentiment_type] = len(sentimentsOfType)

    print(sentimentCounts)
    return sentimentCounts
