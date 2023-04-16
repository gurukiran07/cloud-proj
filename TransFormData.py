import json
import boto3
import pandas as pd
from io import StringIO

bucket_name = 'dpfilesdpgurukiran';
s3 = boto3.client('s3')


def load_s3_data(uuid, filename):
    s3_resp = s3.get_object(
        Bucket=bucket_name,
        Key=f"{uuid}/{filename}"
    )
    return pd.read_csv(s3_resp['Body'])

def write_num_cols_stats(df):
    num_stats = df.describe()
    return num_stats

sns = boto3.client('sns')
sqs = boto3.client('sqs')

def lambda_handler(event, context):
    req = json.loads(event['Records'][0]['body'])
    df = load_s3_data(req['uuid'], req['fname'])
    out = write_num_cols_stats(df)
    outBody = out.reset_index().to_csv(index=False)
    s3.put_object(Bucket=bucket_name, 
Key=f"{req['uuid']}/processed/{req['fname']}", Body=outBody)

    sqs.send_message(
        
QueueUrl='https://sqs.us-east-1.amazonaws.com/432954724596/ProcessedQ',
        MessageBody=json.dumps({
            'uuid': req['uuid']
        })
    )
    
    sqs.send_message(
        
QueueUrl='https://sqs.us-east-1.amazonaws.com/432954724596/FileDownloadQ',
        MessageBody=req['uuid']
    )
    return {}

