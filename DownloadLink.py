import json
import boto3
from io import StringIO
import pandas as pd
s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'dpfilesdpgurukiran'
    filename = event['fname']

    obj = s3.get_object(Bucket=bucket_name, Key=filename)
    data = obj['Body'].read().decode('utf-8')
    df = pd.read_csv(StringIO(data))
    csv = df.to_csv(index=False)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "text/csv",
            f"Content-Disposition": "attachment; filename=filename.csv"
        },
        "body": csv
    }

