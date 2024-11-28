import json
import urllib.parse
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    response = s3.get_object(Bucket=bucket, Key=key)
    file = response['Body'].read().decode('utf-8')
    reviews = json.loads(file)
    for review in reviews:
        dynamodb.put_item(
            TableName='MovieReviews',
            Item={
                'movie':{'S': review['movie']},
                'reviewer':{'S': review['reviewer']},
                'review_detail':{'S': review['review_detail']}
            }
        )
    return {
        'statusCode': 200,
        'body': json.dumps('Successful sorting of new review entries.')
    }