import json
import urllib.parse
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):

    # bucket = event['Records'][0]['s3']['bucket']['name']
    # key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    bucket = 'raw-reviews'
    key = 'test.json'
    response = s3.get_object(Bucket=bucket, Key=key)
    file = response['Body'].read().decode('utf-8')
    reviews = json.loads(file)
    print("Showing response under")
    print(reviews)
    print("End of response")
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

