import json
import boto3 

sns = boto3.client('sns')
s3 = boto3.client('s3')
sqs = boto3.client('sqs')

def lambda_handler(event, context):
    req = json.loads(event['Records'][0]['body'])
    sns_res = sns.publish(
        
TopicArn=f"arn:aws:sns:us-east-1:432954724596:{req['uuid']}_data_processor",
        Message="The file uploaded to the cloud has been processed",
        Subject="Cloud-proj File Processes Successfully"
    )
    
    s3.put_object(
        Bucket='dpfilesdpgurukiran',
        Key=req['uuid']+ '.text',
        Body="abc"
    )
    
    sns.delete_topic(
        
TopicArn=f"arn:aws:sns:us-east-1:432954724596:{req['uuid']}_data_processor"
    )
    
    sqs.delete_message(
        
QueueUrl='https://sqs.us-east-1.amazonaws.com/432954724596/ProcessedQ',
        ReceiptHandle=event['Records'][0]['receiptHandle']
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!'),
        'uuid': req['uuid'],
        'sns': sns_res
    } 

