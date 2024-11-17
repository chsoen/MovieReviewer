import json


import boto3

client = boto3.client('comprehend')

def lambda_handler(event, context):

    text = event['text']
    sentiment = client.detect_sentiment(Text=text,LanguageCode='en')
    prediction = sentiment['Sentiment']
    score = sentiment['SentimentScore']
    
    return {
        'comprehend_prediction': prediction,
        'comprehend_scores': score
    }