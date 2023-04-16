import json
import boto3
import base64

sqs = boto3.client('sqs')
s3 = boto3.client('s3');
def lambda_handler(event, context):
    bucket_name = 'dpfilesdpgurukiran';
    filename = event['fname']
    data = base64.b64decode(event['base64'])
    uuid = event['uuid']
    message = ""
    try:
        s3_resp = s3.put_object(Bucket=bucket_name, 
Key=f"{uuid}/{filename}", Body=data)
        message = 'File Upload Successful'
        sqs.send_message(
            
QueueUrl="https://sqs.us-east-1.amazonaws.com/432954724596/UploadedQ",
            MessageBody=json.dumps({
                'message': message,
                'uuid': uuid,
                'fname': filename,
                's3_resp': s3_resp
            })
        )
        while ( True ):
            msg = sqs.receive_message(
                
QueueUrl='https://sqs.us-east-1.amazonaws.com/432954724596/FileDownloadQ',
                WaitTimeSeconds=10
            )

            if (len(msg['Messages']) > 0):
                processed_file = f"{uuid}/processed_file/{filename}"
                rc_handle = msg['Messages'][0]['ReceiptHandle']
                sqs.delete_message(
                    
QueueUrl='https://sqs.us-east-1.amazonaws.com/432954724596/FileDownloadQ',
                    ReceiptHandle=rc_handle
                )
                break

    except Exception as e:
        message = 'File Upload Failed'
        processed_file = str(e)
        rc_handle = 'error'

    return {
        'message': message,
        'uuid': uuid,
        'fname': filename,
        # 's3_resp': s3_resp,
        # 'processed_file': processed_file,
        # 'rh': rc_handle,
        # 'msg': msg
    }

