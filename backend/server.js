import express from 'express'
import cors from 'cors'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const app = express()

app.use(cors())

let query = {"movie": "Kill Bill: Vol. 2 (2004)"}
// , "rating": "8", "review_summary": "Good follow up that answers all the questions", "review_date": "24 July 2005", "spoiler_tag": 0, "review_detail": "After seeing Tarantino's Kill Bill Vol: 1, I got to watch Vol. 2 the next day after seeing it. I liked the first one but didn't really know everything that was going on, but just knowing that she set off the kill 5 individuals who left her dead at her wedding. So I saw Kill Bill: Vol 2 and liked it highly. The movie answered all of my questions to the previous one and had much of a better story and was not unrealistic that much. We finally get to see Bill, who is played by David Carradine who had a really good role in the movie. There is a great conclusion to the movie and had a very good story, along with likable characters, my favorite being Budd. Overall, good movie that answers tons of questions. I recommend Kill Bill Vol. 2.Hedeen's Outlook: 8/10 *** B", "helpful": ["0", "1"]}

const REGION = 'ca-central-1';
const client = new LambdaClient({ region: REGION });

const invokeLambda = async () => {
    const command = new InvokeCommand({
        FunctionName: 'RunModel',
        Payload: Buffer.from(JSON.stringify(query))
    });

    try {
        const response = await client.send(command);
        const responsePayload = JSON.parse(new TextDecoder().decode(response.Payload));
        console.log('Lambda response:', responsePayload);
        return responsePayload
    } catch (error) {
        console.error('Error invoking Lambda:', error);
    }
};

let map = {
            POSITIVE: 5,
            NEUTRAL: 3,
            MIXED: 2,
            NEGATIVE: 0
        }



app.get('/movies/:movie', async (req, res) => {
    // let movie = req.params.movie
    // console.log(movie)
    // res.send({
        //     review: 5
        // })
    let rating = await invokeLambda();
    console.log(rating["NEGATIVE"], rating["NEUTRAL"], rating["MIXED"], rating["POSITIVE"])
    let total_reviews = rating["NEGATIVE"] + rating["NEUTRAL"] + rating["MIXED"] + rating["POSITIVE"]
    let rating_final = (rating["NEGATIVE"]*map["NEGATIVE"] + rating["NEUTRAL"]*map["NEUTRAL"] + rating["MIXED"]*map["MIXED"] + rating["POSITIVE"]*map["POSITIVE"]) / total_reviews
    console.log(rating_final)
    res.send({"rating" : rating_final})
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})