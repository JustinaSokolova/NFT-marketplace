Docker:

1. docker build --tag marketplace-client -f ./marketplace-client.dockerfile .
2. docker run --name marketplace-client -d -p 3000:3000 marketplace-client
