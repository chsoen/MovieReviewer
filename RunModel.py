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
        sentimentsOfType = list(filter(lambda sentiment: sentiment['Sentiment'] == sentiment_type, resultList))
        sentimentCounts[sentiment_type] = len(sentimentsOfType)

    print(sentimentCounts)
    return sentimentCounts
