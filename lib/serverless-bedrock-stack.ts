import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class ServerlessBedrockStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create IAM role for Lambda with Bedrock permissions
    const lambdaRole = new iam.Role(this, 'BedrockLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Add Bedrock permissions to the Lambda role
    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        'bedrock:InvokeModel',
      ],
      resources: ['*'], // You might want to restrict this to specific model ARNs in production
    }));

    // Create Lambda function
    const bedrockFunction = new lambda.Function(this, 'BedrockFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'bedrock_handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      role: lambdaRole,
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'BedrockApi', {
      restApiName: 'Bedrock Claude API',
      description: 'API Gateway for Claude 3 Haiku on Amazon Bedrock',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Create API Gateway resource and method
    const bedrockResource = api.root.addResource('generate');
    bedrockResource.addMethod('POST', new apigateway.LambdaIntegration(bedrockFunction));

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'URL of the API Gateway',
    });
  }
}
