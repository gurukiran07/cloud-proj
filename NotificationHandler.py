import json
import boto3

sns = boto3.client('sns')
def lambda_handler(event, context):
    uuid = event['uuid']
    resp = sns.create_topic(
        Name=f"{uuid}_data_processor",
        Attributes={'DisplayName': "Data Processor"}
    )
    
    sns.subscribe(
        TopicArn=resp['TopicArn'],
        Protocol='email',
        Endpoint=event['email']
    )
    return resp

