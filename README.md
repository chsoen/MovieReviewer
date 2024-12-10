# MovieReviewer
Movie reviewer using Amazon Comprehend with lambda functions and S3 to store raw data. Results get stored into a database.

We'll sample reviews from [this dataset of JSON files](https://www.kaggle.com/datasets/ebiswas/imdb-review-dataset).
These sample reviews are splitted up and placed as S3 objects in a raw reviews bucket.

Key value pair description of each JSON object in the dataset from dataset description:
| Content        | Details                                                              |
| -------------- | -------------------------------------------------------------------- |
| review_id      | It is generated by IMBb and unique to each review                    |
| reviewer       | Public identity or username of the reviewer                          |
| movie          | It represents the name of the show (can be - movie, tv-series, etc.) |
| rating         | Rating of movie out of 10, can be None for older reviews             |
| review_summary | Plain summary of the review                                          |
| review_date    | Date of the posted review                                            |
| spoiler_tag    | If 1 = spoiler & 0 = not spoiler                                     |
| review_detail  | Details of the review                                                |
| helpful        | list[0] people find the review helpful out of list[1]                |

## Instructions to use the app

- Clone the repo
- Use the aws command line interface to run the command "aws configure", and then provide the AWS access key ID and AWS secret access key
- Accept the default region (ca-central-1) and output format (json).
- Then run the command 'aws configure set aws_session_token "\<token\>"' and replace the \<token\> with the AWS session token.
  - You can get the AWS access key ID, AWS secret access key and AWS session token from the access keys section of CPSC_436C_101_2024W1_G15 in aws access portal.
- Once the keys are set, cd into the ./MovieReviewer/backend/ directory, run 'npm install' to get the node modules (Make sure you have nodejs installed).
- Once, the node modules are downloaded, run npm start to start the backend
- Once the backend is started, cd into ./MovieReviewer/frontend/vite-project directory and run 'npm install'.
- Then, run "npm run dev" to start the frontend server at http://localhost:5173/ .
- Once running, Click the link http://localhost:5173/ or paste in your browser, and the application will open and be ready to use.
